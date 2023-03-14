
/// <reference path="./components/project-input.ts"/>
/// <reference path="./components/project-list.ts"/>

//El orden es importante ya que si un archivo requiere a otro archivo este archivo requerido tiene que estar por encima.


namespace App {

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');

}

