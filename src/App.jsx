import React from 'react'
import gsap from 'gsap';
import {Dock,Navbar, Welcome} from "#components"
import {Text, Image, Typora, Finder, Resume, Safari, Terminal, Contact } from "#windows";
import Draggable from 'gsap/src/Draggable';
gsap.registerPlugin(Draggable);
const App = () => {
  return (
    <main>
      <Navbar/>
      <Welcome/>
      <Dock/>
      <Safari/>
      <Terminal/>
      <Resume/>
      <Finder/>
      <Text/>
      <Image/>
      <Typora/>
      <Contact/>
    </main>
  )
}

export default App