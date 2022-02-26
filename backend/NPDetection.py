import numpy as np
import cv2
import imutils
import sys
import pytesseract
import time

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def pipeline2():

    image = cv2.imread('./image.jpeg')
    image = imutils.resize(image, width=500)
    
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    gray = cv2.bilateralFilter(gray, 11, 17, 17)

    edged = cv2.Canny(gray, 170, 200)
    
    (cnts, _) = cv2.findContours(edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    cnts=sorted(cnts, key = cv2.contourArea, reverse = True)[:30]

    NumberPlateCnt = None 
    
    for c in cnts:
        
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.02 * peri, True)
        
        if len(approx) == 4:  
            NumberPlateCnt = approx 
            break

    
    mask = np.zeros(gray.shape,np.uint8)
    new_image = cv2.drawContours(mask,[NumberPlateCnt],0,255,-1)
    new_image = cv2.bitwise_and(image,image,mask=mask)
    
    config = ('-l eng --oem 1 --psm 3')

    text = pytesseract.image_to_string(new_image, config=config)

    return text


pipeline2()