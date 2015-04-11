# StartDust #

Hello all welcome to Stardust world.

Stardust is an application that displays data interactively asteroids that are dangerous to earth by calculating its orbit to the sun, the sun is scaled size, and asteroids are also in size scale with respect to planet earth.

the scale size of asteroids were increased to distinguish better if they would not be very small.

## Overview ##

This java library provides a way to read the Minor Planet Catalogues provided by the Minor Planets Center.

This can handle reading either the MPCORB.DAT file, compressed or otherwise and the mpX.txt type files.

## Dependencies ##

We have artifacts hosted on Maven Central. http://search.maven.org/#search|ga|1|mpc-reader 


## Usage ##

To construct a reader you first need a ```com.wselwood.mpcreader.MinorPlanetReaderBuilder``` this will allow you to set the needed options on the reader before construction.

The one required option is the file to open set with the ```open(File f)``` method.

If the file is gzip compressed the builder will detect this. It looks at the first two bytes of the file having the gzip header so it doesn't matter if the file does not have the .gz extension. If some how this goes wrong you can set ```compressed()``` or ```unCompressed()``` on the builder to turn on or off compressed reading.

Calling the ```convertAngles()``` method on the builder will convert all the angles in the file into radians rather than degrees. This may be useful if you are doing any orbital calculations as most of the java maths functions take radian angles. Note this will induce a small rounding error from dividing double values.

Finally when you have your builder in the state you want call the ```build()``` method which will construct the ```com.wselwood.mpcreader.MinorPlanetReader``` Note this method can throw an IOException

The reader class provides two methods ```hasNext()``` which returns true if there are more records in the file. and ```next()``` which returns the next record.

Both these methods can throw IOExceptions and the next method can throw ```com.wselwood.mpcreader.InvalidDataException``` if the record will not parse for some reason. If you get this happen I suggest you re-download the file as it is probably corrupt.

The next method returns a ```com.wselwood.mpcreader.MinorPlanet``` object which contains the decoded details for a minor planet. This class is immutable. You are not expected to ever want to construct these your self.

Finally there is a ```close()``` method on the reader which will close down the file handle. This should always be called when you are done with the reader.


## Building ##

If you want to checkout and build the project follow these steps:

## Change log ##

v0.1.1 Fix timezone bug in unpacked dates.

v0.1.0 Initial release