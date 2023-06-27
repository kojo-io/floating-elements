import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class TcFloatingElementsService {

  constructor() { }

  setPosition(mainElement: HTMLElement, floatingElement: HTMLElement, option?:
    {
      position?: 'top' | 'left' | 'right' | 'bottom',
      offset?: number,
      shift?: {shiftElement?: boolean, padding?: number},
      useEvents?: boolean,
      events?: 'mouse event' | 'click event'
    }): Promise<{top: number, left: number}> {
    return new Promise((resolve, reject) => {
      let position = option?.position;
      let top =   mainElement.getBoundingClientRect().top as number;
      let left= mainElement.getBoundingClientRect().left as number;
      const offsetRight = window.innerWidth - mainElement.offsetLeft - mainElement.offsetWidth;
      const offsetBottom = window.innerHeight - mainElement.offsetTop - mainElement.clientHeight;
      const offsetLeft = mainElement.offsetLeft;
      const offsetTop = mainElement.offsetTop;
      let topLeft;
      if (option?.useEvents) {
        floatingElement.classList.add('hidden');

        if (option?.events === 'mouse event') {
          mainElement.onmouseenter = () => {
            floatingElement.classList.toggle('hidden');
          }

          mainElement.onmouseleave = () => {
            floatingElement.classList.toggle('hidden');
          }
        }

        if(option?.events === 'click event') {
          mainElement.onclick = () => {
            floatingElement.classList.toggle('hidden');
          }
        }
      }

      const offsetShiftRightTopPlacement = () => {
        topLeft = this.topPlacement(mainElement);
        top = topLeft.top + (option?.offset ?? 0);
        left = topLeft.left;

        if (option?.shift?.shiftElement) {
          left = topLeft.left + mainElement.clientWidth + (option?.shift?.padding ?? 0)
        }
      }

      const offsetShiftLeftTopPlacement = () => {
        topLeft = this.topPlacement(mainElement);
        top = topLeft.top + (option?.offset ?? 0);
        left = topLeft.left;

        if (option?.shift?.shiftElement) {
          left = topLeft.left - mainElement.clientWidth - (option?.shift?.padding ?? 0)
        }
      }

      const offsetTopPlacement = () => {
        topLeft = this.topPlacement(mainElement);
        top = topLeft.top + (option?.offset ?? 0);
        left = topLeft.left;
      }

      const offsetShiftRightBottomPlacement = () => {
        topLeft = this.bottomPlacement(mainElement);
        top = topLeft.top + (option?.offset ?? 0);
        left = topLeft.left;


        if (option?.shift?.shiftElement) {
          left = topLeft.left + mainElement.clientWidth + (option?.shift?.padding ?? 0)
        }
      }

      const offsetShiftLeftBottomPlacement = () => {
        topLeft = this.bottomPlacement(mainElement);
        top = topLeft.top + (option?.offset ?? 0);
        left = topLeft.left;


        if (option?.shift?.shiftElement) {
          left = topLeft.left - mainElement.clientWidth - (option?.shift?.padding ?? 0)
        }
      }

      const offsetBottomPlacement = () => {
        topLeft = this.bottomPlacement(mainElement);
        top = topLeft.top + (option?.offset ?? 0);
        left = topLeft.left;
      }

      const offsetRightPlacement = () => {
        let topLeft = this.rightPlacement(mainElement, floatingElement);
        top = topLeft.top;
        left = topLeft.left + (option?.offset ?? 0);
      }

      const offsetLeftPlacement = () => {
        let topLeft = this.leftPlacement(mainElement, floatingElement);
        top = topLeft.top;
        left = topLeft.left - (option?.offset ?? 0);
      }

      if (offsetTop === 0 && offsetLeft === 0 && offsetRight > 0 && offsetBottom > 0) {
        if (position === 'top' || position === 'bottom') {
          offsetShiftRightBottomPlacement();
        }

        if (position === 'left' || position === 'right') {
         offsetRightPlacement();
        }
      }

      if (offsetTop === 0 && offsetLeft > 0 && offsetRight > 0 && offsetBottom > 0) {
        if (position === 'top' || position === 'bottom') {
          offsetBottomPlacement();
        }

        if (position === 'left') {
          offsetLeftPlacement();
        }

        if (position === 'right') {
          offsetRightPlacement();
        }
      }

      if (offsetTop === 0 && offsetLeft > 0 && offsetRight === 0 && offsetBottom > 0) {
        if (position === 'top' || position === 'bottom') {
          offsetShiftLeftBottomPlacement();
        }

        if (position === 'left' || position === 'right') {
         offsetLeftPlacement();
        }
      }

      if (offsetTop > 0 && offsetLeft === 0 && offsetRight > 0 && offsetBottom > 0) {
        if (position === 'top') {
          offsetShiftRightTopPlacement();
        }

        if (position === 'bottom') {
          offsetShiftRightBottomPlacement();
        }

        if (position === 'left' || position === 'right') {
         offsetRightPlacement();
        }
      }

      if (offsetTop > 0 && offsetLeft > 0 && offsetRight > 0 && offsetBottom > 0) {
        if (position === 'top') {
          offsetTopPlacement();
        }

        if (position === 'bottom') {
          offsetBottomPlacement()
        }

        if (position === 'left') {
          offsetLeftPlacement();
        }

        if (position === 'right') {
         offsetRightPlacement();
        }
      }

      if (offsetTop > 0 && offsetLeft > 0 && offsetRight === 0 && offsetBottom > 0) {
        if (position === 'top') {
          offsetShiftLeftTopPlacement();
        }

        if (position === 'bottom') {
          offsetShiftLeftBottomPlacement();
        }

        if (position === 'left' || position === 'right') {
          offsetLeftPlacement();
        }
      }

      if (offsetTop > 0 && offsetLeft === 0 && offsetRight > 0 && offsetBottom === 0) {
        if (position === 'top' || position === 'bottom') {
          offsetShiftRightTopPlacement();
        }

        if (position === 'left' || position === 'right') {
          offsetRightPlacement();
        }
      }

      if (offsetTop > 0 && offsetLeft > 0 && offsetRight > 0 && offsetBottom === 0) {
        if (position === 'top' || position === 'bottom') {
          offsetTopPlacement();
        }

        if (position === 'left') {
          offsetLeftPlacement();
        }

        if (position === 'right') {
          offsetRightPlacement();
        }
      }

      if (offsetTop > 0 && offsetLeft > 0 && offsetRight === 0 && offsetBottom === 0) {
        if (position === 'top' || position === 'bottom') {
          offsetShiftLeftTopPlacement();
        }

        if (position === 'left' || position === 'right') {
          offsetLeftPlacement();
        }
      }

      resolve({
        top: top,
        left: left
      });
    })
  }
  private bottomPlacement(mainElement: HTMLElement): {top: number, left: number} {
    let top = mainElement.getBoundingClientRect().top + mainElement.clientHeight;
    let left = mainElement.getBoundingClientRect().left - mainElement.clientWidth;

    return { top, left};
  }

  private topPlacement(mainElement: HTMLElement): {top: number, left: number} {
    let top = mainElement.getBoundingClientRect().top - mainElement.clientHeight;
    let left = mainElement.getBoundingClientRect().left - mainElement.clientWidth;

    return { top, left};
  }

  private leftPlacement(mainElement: HTMLElement, popElement: HTMLElement): {top: number, left: number} {
    let top = mainElement.getBoundingClientRect().top + (mainElement.clientHeight - popElement.clientHeight)/2;
    let left = mainElement.getBoundingClientRect().left - popElement.clientWidth;

    return { top, left};
  }

  private rightPlacement(mainElement: HTMLElement, popElement: HTMLElement): {top: number, left: number} {
    let top = mainElement.getBoundingClientRect().top + (mainElement.clientHeight - popElement.clientHeight)/2;
    let left = mainElement.getBoundingClientRect().left + mainElement.clientWidth;

    return { top, left};
  }
}
