<h1 align="center">Vehicle Info</h1>

## About The Project

This is a mobile application for Vehicle Number Plate Detection & Recognition 
<h4 align="left">Places where this app can be used as solution:</h4>
<ul>
 <li>Managing information about car park usage</li>
 <li>Verifying RTO registration of vehicle</li>
 <li>Flexible and automatic entry of vehicle at large events,commercial places etc.</li>
 <li>Effective enforcement of traffic rules</li>
</ul>
<h4 align="left">Understanding problem :</h4>
<ul>
 <li>Number plate detection : locating number plate from provided image using image processing</li>
 <li>Extracting text from the detected Number Plate: Extracting alphanumeric characters from cropped license plate using OCR</li>
</ul>
<h4 align="left">Solution Approach:</h4>
<ul>
 <li>In our app we can provide image from gallery or capture it using the inbuilt camera </li>
 <li>Selected image is sent to flask backend as URI (HTTP request to backend server)</li>
 <li>Backend detects the respective media and encode the acquired BINARY_CONTENT in a single media file in the same directory.</li>
 <li>Image processing is done using OpenCV functions like imutils, greyscale conversion ,canny edge detection ,contour detection for extracting number plate.</li>
 <li> pytesseract OCR is used for extracting alphanumeric characters from detected number plate.</li>
 <li>Extracted number is sent back to front end (await fetch call)where it is displayed below VAAHAN webview and Copy-to-clipboard option get enabled.</li>
</ul>
 



## Interface

<img src="https://user-images.githubusercontent.com/73283087/155839397-d7a66061-8550-47df-972f-525a8d3511fd.png" width="225" height="450">

<img src="https://user-images.githubusercontent.com/73283087/155840894-7e7c9e43-1bfa-44d4-880f-04d777b1f3c3.png" width="225" height="450">

<img src="https://user-images.githubusercontent.com/73283087/155839574-87925651-c6d0-4811-80f3-fe66bfa0dee1.png" width="225" height="450">






---
## Demo

![demo](Screenshots/Demo.gif)

---
<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://flask.palletsprojects.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/pocoo_flask/pocoo_flask-icon.svg" alt="flask" width="40" height="40"/> </a> <a href="https://opencv.org/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/opencv/opencv-icon.svg" alt="opencv" width="40" height="40"/> </a> <a href="https://reactnative.dev/" target="_blank" rel="noreferrer"> <img src="https://reactnative.dev/img/header_logo.svg" alt="reactnative" width="40" height="40"/> </a> </p>


### Installation

1. Clone the repo

```
https://github.com/akshaykhoje/Vehicle-Info.git
```
2. Move Into Working Directory

```
cd Vehicle-Info
```

3. To Setup Backend
create a virtual environment using virtualenv
 
```
python -m virtualenv <env_name>
source <env_name>/bin/activate
```
Install all the requirements using pip command [requirements.txt](./backend/requirements.txt)

```
pip install -r requirements.txt
```
4. To Setup Frontend run command
```
npm install
```
5. Run the Project 
```
expo start
```
```
cd backend
flask run -h 192.168.31.108
```
6. You can run it on your android emulator OR using expo app to use this project

## Mentor

Asst. Prof. Vaibhav Khatavkar

## Authors
<ul>
<li><a href="https://github.com/akshaykhoje">@akshaykhoje</a></li>
<li><a href="https://github.com/ManasKulkarniGit">@ManasKulkarniGit</a></li>
<li><a href="https://github.com/Mayur2506">@Mayur2506</a></li>
</ul>
