import { Component } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Hero } from './hero/hero';
import { Features } from './features/features';
import { Menu } from './menu/menu';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, Features, Menu, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
