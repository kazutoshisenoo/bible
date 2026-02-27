import zipfile
import xml.etree.ElementTree as ET

def extract_text(docx_path):
    z = zipfile.ZipFile(docx_path)
    xml_content = z.read('word/document.xml')
    tree = ET.fromstring(xml_content)
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    paras = []
    for p in tree.iterfind('.//w:p', ns):
        texts = [t.text for t in p.iterfind('.//w:t', ns) if t.text]
        if texts:
            paras.append(''.join(texts))
    return '\n'.join(paras)

if __name__ == '__main__':
    print(extract_text('文章.docx'))
