from flask import Flask, request, jsonify
import os

app = Flask(__name__)
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_video():
    if 'video' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    video = request.files['video']

    if video.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if video:
        file_path = os.path.join(UPLOAD_FOLDER, video.filename)
        video.save(file_path)
        return jsonify({'message': 'File uploaded successfully'}), 200
    
if __name__ == '__main__':
    app.run(debug = True)