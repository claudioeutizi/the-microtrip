
<!-- PROJECT SHIELDS -->
<a name="readme-top"></a>
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![MIT License][license-shield]][license-url]

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

## Authors
* [Mattia Massimi](https://github.com/mattiamassimi)
* [Claudio Eutizi](https://github.com/claudioeutizi)
* [Vittoria Malaman](https://github.com/VittoriaMalaman)
* [Greta Lia Gibelli](https://github.com/gretagib)


<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description`

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Material UI][Material-UI]][Mui-url]
* [![Express][Express.js]][Express-url]
* [![JQuery][JQuery.com]][JQuery-url]
* [![Node.js][Node.js]][Node-url]

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
   
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Project Link: [https://github.com/github_username/repo_name](https://github.com/github_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

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
