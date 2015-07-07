# [Download Button Concept](http://eduardolopes.github.io/download-button-concept)



## Flow

```
                       +--------+
                       |        |
         +------------->  IDLE  <---------------------+
         |             |        |                     |
         |             +----+---+                     |
         |                  |                         |
         |                  |                         |
+--------+-----+    +-------v-------+    +---------+  |
|              |    |               |    |         |  |
|  CANCELLING  <----+  DOWNLOADING  <---->  ERROR  |  |
|              |    |               |    |         |  |
+--------------+    +-------+-------+    +---------+  |
                            |                         |
                            |                         |
                       +----v---+                     |
                       |        |                     |
                       |  DONE  +---------------------+
                       |        |
                       +--------+
```

##About animations

Limited to animate only opacity and transform stuff (only translate, rotate and scale)! Don't animate anything that calls repaints or layout recalculations!

## Progress bar

The progress bar is made using canvas. I'm not limiting myself to use pure CSS!

## requestAnimationFrame

requestAnimationFrame is called only when the download button is not 'idle', and canceled when the button is 'idle' again. It's used to animate the progress bar, as well for count the time to wait for trigger the animations! A loop is not that necessary (only to animete the proguess bar), but i'm using here to give life to the button. In the real world, events could make it alot easier!

## About cancel download button

At the end i decided to remove the hover effect to cancel the download, so it can work on touch screens as well. it's not pretty tho! I know a way to fix that, i'll do in the next one!