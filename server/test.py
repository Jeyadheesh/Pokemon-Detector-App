from tensorflow.keras.models import load_model
import tensorflow as tf
import cv2
import os
import numpy as np
from matplotlib import pyplot as plt

classes = os.listdir('client\server\data\PokemonData')
# print(classes)

new_model = load_model('client\server\models\imageclassifier.h5')
image_path = 'client\server\check.png'
img = cv2.imread(image_path)
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
resize = tf.image.resize(img_rgb, (256, 256)) 
input_image = np.expand_dims(resize / 255, 0)  


predictions = new_model.predict(input_image)
predicted_class_index = np.argmax(predictions)
predicted_class_name = classes[predicted_class_index]

plt.imshow(resize.numpy().astype(int))
plt.title(f'Predicted class: {predicted_class_name}')
plt.show()