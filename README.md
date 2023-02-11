
<a name="readme-top"></a>

# The MICRO:TRIP

**ACTAM (Advanced Coding Tools &amp; Methodologies) Project for AY 2022/23.
Music And Acoustic Engineering M.Sc Politecnico di Milano, Italy.**

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## The Project

![[MICRO_TRIP.png]]

The **MICRO:TRIP** is a powerful web audio application with the aim of creating a virtual environment in which to explore new sounds in a very innovative way.
The application wants to create the **_Traveling room of a meteoropathic musician_** who sits at the desk and let her/himself's mood be influenced by the ambient conditions, and so her/his music. 

With the help of several technologies, the MICRO:TRIP captures the external and internal ambient conditions and links the acquired data with the parameters that govern the audio effects.

As already said, this room is *traveling*! Some sort of magic can teleport you and your room in a city that you can choose in the map. Each city has a typical musical instrument whose sound is then processed in the MICRO:TRIP according to the external ambient conditions of the city and the internal conditions of the room.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
* Please use Chrome as Browser for the correct functioning of the application:
[Download Google Chrome](https://www.google.com/chrome/)

* It is necessary to have NPM installed in your device.

  ```sh
  npm install npm@latest -g
  ```

### Installation
Some critical steps are required to set up things order to exploit all the functionalities of The MICRO:TRIP.
* **Clone the repo**

   ```sh
   git clone https://github.com/claudioeutizi/repo_name.git
   ```
* **Server**: 
1. Go in the Server folder and install NPM packages

   ```sh
   cd Server
   npm install --legacy-peer-deps
   ```
* **Client**: 
1. Sign up at [RapidAPI](https://rapidapi.com/hub) and get a free API Key for [GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities)
2. Sign up and get a free API Key at [OpenWeatherMap](https://openweathermap.org/api)

4. Install NPM packages

   ```sh
   cd client
   npm install --legacy-peer-deps
   ```
5. Enter your APIs in `client/utility/api.js`

   ```js
    ...
   	headers: {
		'X-RapidAPI-Key': '[YOUR_RAPID_API_KEY_HERE]',
    ...
   ```
   ```js
   export const WEATHER_API_KEY = '[YOUR_OPENWEATHER_API_KEY_HERE]'
   ```
   
6.  In the Server folder run this command in order to start the server application (notice that if you do not have a micro:bit from which to acquire data, running the server is not necessary):
```sh
	npm start
```
Make sure to read what the console logs. You should see a message like this:

> api@0.0.0 start
> node app.js
> Serial port COM11 opened for micro:bit connection!
	new socket connection: \<connectionSocketCode\>

7. In the Client folder run this command in order to start the Client application:
   ```sh
	npm start
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>
# Structure

As said before, the application needs to acquire a lot of data in order to fully exploit its potential. 

Nevertheless, it is important to focus that the application can also work as a standalone audio sampler without the acquisition of the data. In this way, it will be possible to control the instrument only manually, without the dynamic change of the data-dependent audio parameters. This implementation choice have been done to ensure the functioning of the MICRO:TRIP also for users that do not have access to all   the required devices and APIs.

The data about the external weather is collected using **OpenWeatherMap API** and **GeoDB Cities API**, while the information about the ambient condition is acquired exploiting the functionalities of a **BBC Micro:bit** microcontroller.  

Here a high-level architecture of the MICRO:TRIP is shown:

![[architecture.png]]
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### External Device: The Micro:Bit

The [Micro:bit](https://microbit.org/) microcontroller is exploited in order to capture internal **Temperature, Humidity** and **Light** level of the environment. 
The image below shows the small circuit that permits the capture of the required data. In particular, a *DHT11* sensor acquires the temperature and humidity data, while a photoresistor in parallel with a 10kOhm resistor are responsible for the light level.

In the image are also shown a breadboard used for the connections and a **Keyeyestudio Sensor Shield V2**. These two components are not mandatory for the correct functioning of the micro:bit data acquisition;  just connect the DHT11 to the analog pin P1 of the micro:bit and the light circuit to the analog pin P2.

![[microbit.jpg]]

You can find a working .hex file in the repo that you can drag&drop in your connected micro:bit device folder or in your [MakeCode editor](https://makecode.microbit.org/) and install it on your micro:bit board using the editor.
<p align="right">(<a href="#readme-top">back to top</a>)</p>
# Usage

### Controls

The MICRO:TRIP have been designed in order to be as accessible as possible, thus there are several ways to control and play the instrument:

* Clicking with the mouse on the piano keyboard keys;
* Using the keys of the computer keyboard;
* Using a MIDI keyboard.

### Micro:bit

The data from the micro:bit are passed from the board to the *Server* with serial messages and from the *Server* to the *Client* using real-time **Socket.io** messages. 

The acquisition of data is not automatic, but once the board is connected and the Server is running, the values of **temperature** and **humidity** can be acquired by pressing the **button A** on the micro:bit board. 

For what concernes the **light** values, pressing the **Button B**, the micro:bit starts sending serial messages containing the light values, one message every 50ms. Pressing again B, the transmission stops.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## GUI 

### The MICRO:TRIP Room

The first section is reserved to the room GUI. 
![[map-gif.gif]]
* **Wall map:** Clicking on it, a leaflet map opens and you can choose the city you want to go. After that, the window opens and room is teleported in that city, showing a cartoonized skyline and a dynamic sky that depends on the weather conditions and the current time of the city.

* **Display:** A LCD-like display appears when the city has been chosen and shows the data about the external weather conditions and the internal data of the room. The *position button* placed on the bottom-left of the display puts the room back in the current position of the musician, closing the window and showing only the sky.

### The MICRO:TRIP Instrument

![[instrument.png]]
When the musician looks down at the top of her/his desk, the MICRO:TRIP instrument is what she/he sees. An analog-like instrument with interactive and responsive knobs, displays and switches. 

* **Sampler:** The display shows the instrument connected to the city selected on the map. It is also possible to choose the instrument clicking on the display and choosing the instrument in the select menu. the *gain* modifies the input volume of the instrument and the *fine tune* handles the pitch of the sound.

* **Noise:** Clicking on the display it can be chosen the noise type between *white, noise* and *brown*. The *gain* sets the noise volume while the *fadeIn* and *fadeOut* control the noise amplitude attack&release.

* **ADSR:** It controls the amplitude envelope of the instrument with the *Attack, Decay, Sustain and Release* knobs.

* **Filter:** A module with two sub-modules: *LPF (Low Pass Filter)* and *HPF (High Pass Filter)*. Each of these have knobs that control the cutoff frequency and the resonance (or Q) of the filter. Moreover, each filter has an *LFO (Low Frequency Oscillator)* that modulates the cutoff frequency of the filter using a waveform with controllable *rate* and *depth*. The waveform can be chosen between *sine, square, triangle, sawtooth* by clicking on the display.

* **Effects:** Four effects modules are placed in series. *Distortion, Vibrato, Delay, Reverb* in order to achieve a very vast variety of sounds.

* **Master:** The master module that controls the mute/unmute of the entire instrument and its master output volume.

* **Piano Keyboard:** A resizable and interactive piano keyboard with a pitch wheel on the left.

## Data-controlled Audio Parameters

As previously described, the audio parameters of the MICRO:TRIP instrument can be controlled by the data acquired from external APIs and from the micro:bit. This has been done in order to create unique sound textures, trying to simulate the sensations of relief and discomfort that may be caused by the climate conditions.
Here is a detailed list of the parameters affected by the data:

1. **Sampler instrument -> City:** The musical instrument connected to the chosen city.
   
2. **Noise -> Rain or Wind:** It depends on the external weather. If it rains, the noise will be a **white noise** and its gain will be affected by the rain volume in the last 1 hour. If it does not rain, the noise is a **brown noise** and its gain depends on the speed of the wind.
   
3. **LPF -> Internal Light:** The **LPF Cutoff** depends on the level of internal light. The stronger the light, the higher the cutoff frequency and the resonance. In this way the sound get "darker" when the light level is low and vice versa.
   
4. **Distortion -> Internal Humidity and Temperature:** The distortion effect turns on when the **internal temperature & humidity** are captured. With these two parameter, the *humidex* index, or *feels-like temperature* is calculated. This humidex index controls the *wet* level, while the absolute temperature controls the *amount* level.
   
5. **Vibrato -> External Humidity & Temperature**: When a city is chosen, the vibrato effect turns on. The *feel-like external temperature* controls  the *depth* of the effect, while the distance between the *absolute temperature* and the *feels-like temperature* controls the *wet* and the *rate* parameters.
   
6. **Delay -> External Humidity**: The humidity value got for the chosen city from the Weather API controls the *wet* and *feedback* parameters of the delay.

7. **Reverb -> Internal Humidity:**  The internal humidity values arriving from the micro:bit control the *wet* and *decay* parameters of the reverb.


### Built With

* [![React][React.js]][React-url]
* [![Material UI][Material-UI]][Mui-url]
* [![Express][Express.js]][Express-url]
* [![JQuery][JQuery.com]][JQuery-url]
* [![Node.js][Node.js]][Node-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>
## Authors
* [Mattia Massimi](https://github.com/mattiamassimi)
* [Claudio Eutizi](https://github.com/claudioeutizi)
* [Vittoria Malaman](https://github.com/VittoriaMalaman)
* [Greta Lia Gibelli](https://github.com/gretagib)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/Node.js-20232A?style=for-the-badge&logo=nodedotjs&logoColor=339933
[Node-url]: https://nodejs.org/en/
[Tone.js]: https://img.shields.io/badge/Tone.js-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Tone-url]: https://tonejs.github.io/
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Material-UI]: https://img.shields.io/badge/MUI-0769AD?style=for-the-badge&logo=mui&logoColor=007FFF
[Mui-url]: https://mui.com/
[Express.js]: https://img.shields.io/badge/Express-0769AD?style=for-the-badge&logo=express&logoColor=000000
[Express-url]: https://expressjs.com/
