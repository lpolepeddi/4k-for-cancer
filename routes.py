import json
import requests
import requests_toolbelt.adapters.appengine

from flask import Flask, render_template

# Use the App Engine Requests adapter. This makes sure that Requests uses
# URLFetch.
requests_toolbelt.adapters.appengine.monkeypatch()

app = Flask(__name__)


@app.route("/")
def index():
  r = requests.get(
      'https://www.dropbox.com/s/hgqhcnshi4sql91/destinations.json?raw=1',
      allow_redirects=True)
  destinations = json.loads(r.text)

  for i in range(len(destinations)):
    d = destinations[i]

    # add a slug
    location_name = d['location']['name']
    slug = location_name.lower().replace(', ', '-')
    d['slug'] = slug

    # add curve and speed
    if i == 0:
      d['curve'] = 1.42
      d['speed'] = 1.2
    else:
      d['curve'] = 2.5
      d['speed'] = 0.3

  return render_template("index.html", destinations=destinations)


if __name__ == "__main__":
  app.run(debug=True, port=5001)