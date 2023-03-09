##

MariaDB container on Docker:

server: 172.18.0.2

`docker compose up`

### Local environement for Python

1) Run the following command inside the directory to create the virtual environment:

`python3 -m venv venv`

The command will create a directory called venv, which contains a copy of the Python binary, the Pip package manager , the standard Python library, and other supporting files. You can use any name you want for the virtual environment.

2) To start using the virtual environment, you need to activate it with the activate script:

`source venv/bin/activate`

`pip install -r requirements.txt`

Once activated, the virtual environment’s bin directory will be added at the beginning of the $PATH variable. Your shell’s prompt will also change and show the name of the virtual environment you’re currently using. In this example that is venv.

3) Once you are done with your work, deactivate the environment by typing deactivate, and you will return to your normal shell.

`deactivate`

source: https://linuxize.com/post/how-to-install-flask-on-ubuntu-20-04/