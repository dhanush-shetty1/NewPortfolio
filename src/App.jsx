import React from 'react'
import gsap from 'gsap';
import {Dock,Navbar, Welcome} from "#components"
import { Terminal } from "#windows";
import Draggable from 'gsap/src/Draggable';
gsap.registerPlugin(Draggable);
const App = () => {
  return (
    <main>
      <Navbar/>
      <Welcome/>
      <Dock/>
      <Terminal/>
    </main>
  )
}

export default App