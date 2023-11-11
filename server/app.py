from flask import Flask, request, jsonify
import requests
import cv2
import numpy as np
from tensorflow.keras.models import load_model
import os

app = Flask(__name__)

# Load your pre-trained model
model = load_model('client\server\models\imageclassifier.h5')

# Define class names
class_names = os.listdir('client\server\data\PokemonData')

@app.route('/predict', methods=['POST'])
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

if __name__ == '__main__':
    app.run(debug=True)
