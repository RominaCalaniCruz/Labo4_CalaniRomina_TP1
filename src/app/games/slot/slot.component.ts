import { Component } from '@angular/core';
import Swal from 'sweetalert2';
interface Reel {
  images: string[];
  currentIndex: number;
  currentImage: string;
  intervalId?: any;
  intervalTime: number;
}
@Component({
  selector: 'app-slot',
  standalone: false,
  templateUrl: './slot.component.html',
  styleUrl: './slot.component.scss'
})
export class SlotComponent {
  reels: Reel[] = [
    { images: ['assets/slot-machine/1.png', 'assets/slot-machine/2.png', 'assets/slot-machine/3.png', 'assets/slot-machine/4.png', 'assets/slot-machine/5.png', 'assets/slot-machine/6.png', 'assets/slot-machine/7.png'], currentIndex: 0, currentImage: '', intervalTime: 300 },
    { images: ['assets/slot-machine/1.png', 'assets/slot-machine/2.png', 'assets/slot-machine/3.png', 'assets/slot-machine/4.png', 'assets/slot-machine/5.png', 'assets/slot-machine/6.png', 'assets/slot-machine/7.png'], currentIndex: 0, currentImage: '', intervalTime: 500 },
    { images: ['assets/slot-machine/1.png', 'assets/slot-machine/2.png', 'assets/slot-machine/3.png', 'assets/slot-machine/4.png', 'assets/slot-machine/5.png', 'assets/slot-machine/6.png', 'assets/slot-machine/7.png'], currentIndex: 0, currentImage: '', intervalTime: 700 }
  ];
  start: boolean = false;

  constructor() { }

  ngOnInit(): void {

    this.reels.forEach(reel => {
      reel.currentIndex = Math.floor(Math.random() * reel.images.length);
      this.updateCurrentImage(reel);
    });

  }

  girarReel(): void {
    this.start = true;
    this.reels.forEach(reel => this.startInterval(reel));
  }

  startInterval(reel: Reel): void {
    reel.intervalId = setInterval(() => {
      reel.currentIndex = (reel.currentIndex + 1) % reel.images.length;
      this.updateCurrentImage(reel);
    }, reel.intervalTime);
  }

  detenerReel(): void {
    this.start = false;
    this.reels.forEach(reel => clearInterval(reel.intervalId));
    console.log('resultado:');
    this.reels.forEach((reel, index) => {
      console.log(`Reel ${index + 1}: ${reel.currentIndex}`);
    });
    const indices = this.reels.map(reel => reel.currentIndex);
    if (indices[0] === indices[1] && indices[1] === indices[2]) {
      Swal.fire(
        {
          icon: 'success',
          title: 'GANASTE',
          text: 'Tienes mucha suerte',
        }
      );

    } else if (indices[0] === indices[1] || indices[1] === indices[2] || indices[0] === indices[2]) {
      Swal.fire(
        {
          icon: 'info',
          title: 'CASI',
          text: 'solo 2 coincidencia, estas cerca',
        }
      );
    } else {
      Swal.fire(
        {
          icon: 'error',
          title: 'PERDISTE',
          text: 'solo 1 coincidencia, mala suerte',
        }
      );
    }

  }

  updateCurrentImage(reel: Reel): void {
    reel.currentImage = reel.images[reel.currentIndex];
  }

}