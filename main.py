import os
import subprocess
import time

class carbonImage():
    def __init__(self):
        path = ('/home/cleomenezesjr/Documentos/CODE/botWhatsApp/')
        dir = os.listdir(path)
        for file in dir:
            if file in dir and 'code-' in file:
                os.remove(file)
        
        self.generateImage()
    def generateImage(self):
        with open('code.txt', 'r') as json_file:
            data = json_file.read()
        
        code = str(data).replace('```', '')
        
        with open('code.txt', 'w') as code_edit:
            code_edit.write(code)

        json_file.close(), code_edit.close()

        try:
            os.system('npx carbon-now-cli code.txt --headless')
        except:
            os.system('npx carbon-now-cli code.txt --headless')
        finally:
            try:
                self.renameImage()
            except(FileNotFoundError):
                print('Nothing here!')


    def renameImage(self):
        path = ('/home/cleomenezesjr/Documentos/CODE/botWhatsApp/')
        dir = os.listdir(path)
        for file in dir:
            if file in dir and 'code-' in file:
                print(file)
                os.rename(file, 'carbon.png')

    
execution = carbonImage()
print('Done!')