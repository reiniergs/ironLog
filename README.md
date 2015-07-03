# IronLog
turn off yours logs writing a single command and give you more colors and methods in console.

## How to use it?

```html
 <script src="path/to/IronLog.js"></script>
```

#### `console.off()`
turn off yours logs 

```javascript
  console.log('Hello !'); // => Hello !
  console.off();
  console.log('How you doing?'); => // do nothing
```  
#### `console.on()`
also you can turn on whenever you want

```javascript
  console.log('Hello !'); // => Hello !
  console.off();
  console.log('How you doing?'); => // do nothing
  console.on();
  console.log('I am doing well!'); => // I am doing well 
```  
errors keep coming in the console after console.off(), if you want to turn off the errors you can also do so

```javascript
  console.off({ error : true });
  console.error('Something went wrong'); => // do nothing
```  
#### console.openBlock([name]), console.closeBlock([name])
create a group on the console and show the elapsed time in seconds since its start.

```javascript 
  function doSomething() {
    console.openBlock('block 1');
    for (var i = 1; i <= 100000; i++) {
      if (i % 10000 === 0) {
        console.log(i);
      }
    }
    console.closeBlock();
  }
``` 
![Screenshot](https://github.com/reiniergs/ironLog/blob/master/docs/openBlock.png)

#### `console.progressBar(steps_completed, total_steps)`
log in console a progress bar base on the params passed 

```javascript
  console.progressBar(20,60);
```
![Screenshot](https://github.com/reiniergs/ironLog/blob/master/docs/styleCmd.png)

also you can something like this

```javascript
  var bar = console.progressBar(20,60); // render bar (20 of 60)
      bar.add(10);
      bar.log(); // render bar (30 of 60)
      bar.complete();
      bar.log(); // render bar (60 of 60)
```
#### `console.ok()` `console.fail()`
the same of `console.log` but in green and red

#### `console.styleCmd(name, styleObj)`
create you own console method usign you own styles

```javascript
  var styles = {
    'font-size' : '25px',
     color : '#00FF00'
  }
  console.styleCmd('test',styles);
  console.test('Hello world !')
```
![Screenshot](https://github.com/reiniergs/ironLog/blob/master/docs/progressBar.png)




