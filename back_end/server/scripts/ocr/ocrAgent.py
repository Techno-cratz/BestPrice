import os, io
from google.cloud import vision
import pandas as pd
import json

def process_image():
  '''
  Uses the google vision api
  returns the list of items
  '''
  os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.getcwd() + '/serviceaccount_token.json'
  client = vision.ImageAnnotatorClient()

  FILE_PATH = os.getcwd() + '/grocList.jpg'

  with io.open(FILE_PATH, 'rb') as image_file:
      content = image_file.read()

  image = vision.Image(content=content)
  response = client.document_text_detection(image=image)

  docText = response.full_text_annotation.text

  items_list = docText.split()
  for item in items_list:
    if item[0].isalpha() == False:
      items_list.remove(item)


def dump_items(data):
  '''
  Writes the data to the json file
  :param data: The data to write file
  :returns None
  '''
  try:
    with open('./data/query.json', 'w') as outfile:
      json.dump(data, outfile)
  except Exception as e:
    print("[Exception]", e)

if __name__ == '__main__':
  items_list = process_image()
  dump_items({'items': items_list})