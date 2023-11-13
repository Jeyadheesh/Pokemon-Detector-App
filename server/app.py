# Run command : flask run --host=0.0.0.0 --debug
# For Production : gunicorn app:app

from flask import Flask, request, jsonify
import requests
import cv2
import numpy as np
from keras.models import load_model
import os
from flask_cors import CORS,cross_origin
from data.dataClasses import class_names

app = Flask(__name__)
# CORS(app)
# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


# Load your pre-trained model
model_path = os.path.join(os.path.dirname(__file__), 'models', 'imageclassifier.h5')
print(model_path)
model = load_model(model_path)

# Define class names
# data_path = os.path.join(os.path.dirname(__file__), 'data', 'PokemonData')
# class_names = os.listdir('./data/PokemonData')

# print(class_names)
@app.route('/')
def healthCheck():
    return "Works"

@app.route('/predict', methods=['POST'])
# @cross_origin()
def predict():
    try:
        # Get the image URL from the request
        data = request.get_json()
        image_url = data.get('image_url')

        # Download the image
        response = requests.get(image_url)
        image_array = np.asarray(bytearray(response.content), dtype=np.uint8)
        img = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # Preprocess the image
        resize = cv2.resize(img_rgb, (256, 256))
        input_image = np.expand_dims(resize / 255, 0)

        # Use the model to make predictions
        predictions = model.predict(input_image)

        # Get the predicted class index (index with the highest probability)
        predicted_class_index = np.argmax(predictions)

        # Map the class index to the class name
        predicted_class_name = class_names[predicted_class_index]

        # Prepare the response
        response_data = {
            'prediction': predicted_class_name,
            'confidence': float(predictions[0][predicted_class_index])
        }

        return jsonify(response_data)

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    from waitress import serve
    serve(app, host="localhost", port=8080)
