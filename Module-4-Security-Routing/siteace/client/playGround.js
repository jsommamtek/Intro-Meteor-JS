// ES6 Class-based stylization of the Object.prototype model

class Foo {
   constructor(name) {
      this._name = name;
   }

   getName () {
      return this._name;
   }
}

class Bar extends Foo {
   getName () {
      return super.getName() + ' Doe';
   }
}

var bar = new Bar('John');
console.log(bar.getName());