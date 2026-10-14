import { Component } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Hero } from './hero/hero';
import { Features } from './features/features';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, Features, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
