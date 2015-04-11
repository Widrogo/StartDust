# StartDust #

Hello all welcome to Stardust world.

Stardust is an application that displays data interactively asteroids that are dangerous to the earth, making a storytelling of some major asteroids, displays interactively each asteroid's orbit from the sun, together with some data from the asteroid.

the scale size of asteroids were increased to distinguish better if they would not be very small.

## Design of asteroids ##


although each asteroid is not defined by a radius, they have elongated shapes and irregular, in the application calculate an approximate radius, why? good to accurately each asteroid had hampered the development, working with d3.js therefore to show shape and objects, use the SVG (Scalable Vector Graphics) and use <circle /> to plot each asteroid.
This java library provides a way to read the Minor Planet Catalogues provided by the Minor Planets Center.


## As we calculate the orbit ##


Well first application is 2d, to calculate the orbits we use fewer variables, also imagine the orbits as ellipses also use the laws of Kepler, Kepler's laws apply to any celestial body in space.

first Klepler's law: The orbit of a planet is an ellipse with the Sun at one of the two foci.

Second Klepler's Law: A line segment joining a planet and the Sun sweeps out equal areas During equal intervals of time.

third Klepler's law: The square of the orbital period of a planet is proportional to the cube of the semi-major axis of Its orbit.

Kepler's law applies to elliptical orbits of any body in space. Newton founded the universal law of gravitation based on these laws.

we obtain data from an asteroid object, which has the following format:

```javascript var asteroids = [
        {
                "major":276.75,
                "minor":274.36,
                "e":0.075823,
                "focus":36.29,
                "r":313.04,
                "cx":0,
                "cy":0,
                "x":276.75,
                "y":0,
                "theta": 0,
                "ID":2,
                "Radius":0.24,
                "period":1681.601,
                "speed":17.905,
                "name":"CERES",
                "discovered":2009,
                "class":"F",
                "temp":6475
        }];```

the data are calculated as follows:

the first data we obtained with the eccentricity "e" and Semi-major axis "major"

calculate:

Semi-major axis  "minor"

minor= major

## Usage ##



## Run project ##

If you want to checkout and run the project follow these steps:

``` git clone https://github.com/Widrogo/StartDust.git```

 and open the index.html in any explorer
## Refers ##

https://www.khanacademy.org/computer-programming/elliptic-orbit-with-the-correct-speed/1979432907