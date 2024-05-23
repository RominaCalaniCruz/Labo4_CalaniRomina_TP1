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
  slots = [
    'assets/slot-machine/1.jpg',
    'assets/slot-machine/2.jpg',
    'assets/slot-machine/3.jpg',
    'assets/slot-machine/4.jpg',
    'assets/slot-machine/5.jpg'
  ];
  reels: Reel[] = [
    { images: ['assets/slot-machine/1.png', 'assets/slot-machine/2.png', 'assets/slot-machine/3.png', 'assets/slot-machine/4.png', 'assets/slot-machine/5.png','assets/slot-machine/6.png','assets/slot-machine/7.png'], currentIndex: 0, currentImage: '' , intervalTime: 300},
    { images: ['assets/slot-machine/1.png', 'assets/slot-machine/2.png', 'assets/slot-machine/3.png', 'assets/slot-machine/4.png', 'assets/slot-machine/5.png','assets/slot-machine/6.png','assets/slot-machine/7.png'], currentIndex: 0, currentImage: '', intervalTime: 500 },
    { images: ['assets/slot-machine/1.png', 'assets/slot-machine/2.png', 'assets/slot-machine/3.png', 'assets/slot-machine/4.png', 'assets/slot-machine/5.png','assets/slot-machine/6.png','assets/slot-machine/7.png'], currentIndex: 0, currentImage: '' , intervalTime: 700}
  ];
  // reels = [
  //   { slots: [] as string[] },
  //   { slots: [] as string[] },
  //   { slots: [] as string[] }
  // ];
  currentImage: string;
  currentImageIndex = 0;
  slotMachineData: any[] = [];
  initialImageIndex: number;

  one : string = "-";
  two : string = "-";
  three : string = "-";
  credits : number = 10;
  creditCookieName : string = "SlotMachineCredits";
  moveButton : boolean = true;
  start: boolean = false;

  constructor() { }

  ngOnInit(): void {

    // this.currentImage = this.slots[this.currentImageIndex];
    this.reels.forEach(reel => {
      reel.currentIndex = Math.floor(Math.random() * reel.images.length);
      this.updateCurrentImage(reel);
    } );
    // this.startInterval();
    }

    startSpinning(): void {
      this.start = true;
        this.reels.forEach(reel => this.startInterval(reel));
      
    }
  // changeImage(): void {
  //   this.currentImageIndex = (this.currentImageIndex + 1) % this.slots.length;
  //   this.currentImage = this.slots[this.currentImageIndex];
  // }
  startInterval(reel: Reel): void {
    // this.intervalId = setInterval(() => this.spin(), 800); 
    reel.intervalId = setInterval(() => {
      reel.currentIndex = (reel.currentIndex + 1) % reel.images.length;
      this.updateCurrentImage(reel);
    }, reel.intervalTime);
  }
  stopInterval(): void {
    this.start=false;
    this.reels.forEach(reel => clearInterval(reel.intervalId));
    console.log('Índices finales:');
    this.reels.forEach((reel, index) => {
      console.log(`Rodillo ${index + 1}: ${reel.currentIndex}`);
    });
    const indices = this.reels.map(reel=>reel.currentIndex);
    // this.start = true;
    // const uniqueIndices = new Set(coincidencias);
    if (indices[0] === indices[1] && indices[1] === indices[2]){
      Swal.fire(
        {
          icon: 'success',
          title: 'GANASTE',
          text: 'Tienes mucha suerte',
        }
      );
        
    }else if (indices[0] === indices[1] || indices[1] === indices[2] || indices[0] === indices[2]) {
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

  // initializeReels(): void {
  //   for (let reel of this.reels) {
  //     reel.slots = this.shuffle([...this.slots, ...this.slots, ...this.slots]); // Repite los slots para simular un efecto continuo
  //   }
  // }
  // shuffle(array: string[]): string[] {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // }

}