import sys
from html.parser import HTMLParser
class P(HTMLParser):
  def __init__(self):
    super().__init__()
    self.d = []
  def handle_starttag(self, tag, attrs):
    if tag == 'div':
      self.d.append(self.getpos()[0])
  def handle_endtag(self, tag):
    if tag == 'div':
      if self.d:
        self.d.pop()
      else:
        print("EXTRA end div at", self.getpos()[0])

p = P()
p.feed(open('index.html', encoding='utf-8').read())
print("UNCLOSED divs opened at lines:", p.d)
