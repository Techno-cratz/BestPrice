import json
from superstoreAgent import get_super_prices

items = [
  'apple', 'brown rice', 'grapes', 'milk', 'carrots', 'chicken', 'pasta'
]

def check_superstore():
  '''
  Checks the price of items at superstore
  '''
  global items
  # print("****Superstore Prices***")
  result = get_super_prices(items)
  return result

def load_items():
  '''
  Loads items from the json file
  :param None
  :returns None
  '''
  global items
  # Read the json file
  try:
    with open('./data/query.json') as infile:
      data = json.load(infile)
      items = data['items']
  except Exception as e:
    print("[Exception]", e)
  
def dump_items(data):
  '''
  Writes the data to the json file
  :param data: The data to write file
  :returns None
  '''
  try:
    with open('./data/result.json', 'w') as outfile:
      json.dump(data, outfile)
  except Exception as e:
    print("[Exception]", e)

if __name__ == '__main__':
  load_items()
  print(items)
  resSuperstore = check_superstore()
  result = {'superstore': resSuperstore}
  dump_items(result)
  
