# wordle-simulator
A Wordle Game Simulator where you can practice your Wordle skills and gives you statistics about your guesses.

## How to Setup - Frontend/Client Side
### 1. Clone this repository
```
git clone https://github.com/sergelorenz/wordle-simulator.git
```
### 2. Make sure you have nodejs and npm installed (preferrably node v16.13.2 and npm 8.4.0)
Read documentations/articles on how to install node and npm, if you don't have one.
- [Node and NPM for Windows](https://phoenixnap.com/kb/install-node-js-npm-on-windows)
- [Node and NPM for Linux(Ubuntu)](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/)
- [Node and NPM for Mac](https://treehouse.github.io/installation-guides/mac/node-mac.html)

### 3. Download and install packages found in package.json
```
(Make sure you're on parent directory)
npm install
cd client
npm install
```
**Note:** You can use `npm ci` to ensure that the package versions used in this project are replicated

### 4. Start the project
```
npm start
```

### 5. By default, the project should be hosted on localhost:3000. Otherwise, you'll find it in console outputs on what port the project is hosted.

## How to Setup - Backend/Server Side
### 1. Make sure you have python 3. (Python used in this application is version 3.7.0).

### 2. In a separate terminal, go to server folder
```
cd server
```

### 3. Create a virtual environment
```
python -m venv .venv
```

### 4. Activate the virtual environment
Windows:
```
.venv\Scripts\activate
```
Linux or Mac
```
source .venv/bin/activate
```

### 5. Update pip package in the virtual environment
```
python -m pip install --upgrade pip
```

### 6. Install the packages found in requirements.txt
```
pip install -r requirements.txt
```

### 7. Run main.py
Windows:
```
python main.py
```

Linux or Mac
```
python3 main.py
```


## ENJOY!
