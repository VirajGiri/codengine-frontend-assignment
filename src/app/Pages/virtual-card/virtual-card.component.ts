import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  standalone: true,
  selector: 'app-virtual-card',
  templateUrl: './virtual-card.component.html',
  styleUrls: ['./virtual-card.component.css'],
  imports: [CommonModule]
})
export class VirtualCardComponent implements OnInit {

  @Input('customerDetails') customerDetails: any;
  @ViewChild('frontFace') frontFaceEl!: ElementRef;
  @ViewChild('backFace')  backFaceEl!: ElementRef;

  loadingImg = false;
  loadingPdf = false;

  constructor() { }

  ngOnInit(): void {
    console.log('customerDetails', this.customerDetails);
  }

  /** Capture a single face element, stripping 3D transforms via onclone */
  private captureFace(el: HTMLElement): Promise<HTMLCanvasElement> {
    return html2canvas(el, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      onclone: (_doc: Document, cloned: HTMLElement) => {
        // Remove 3D CSS transforms so html2canvas can render the element flat
        cloned.style.transform = 'none';
        cloned.style.backfaceVisibility = 'visible';
        cloned.style.position = 'relative';
        cloned.style.borderRadius = '14px';
      }
    });
  }

  /** Stack front + back vertically into a single canvas */
  private combineFaces(
    frontCanvas: HTMLCanvasElement,
    backCanvas: HTMLCanvasElement
  ): HTMLCanvasElement {
    const scale  = 3;
    const pad    = 40 * scale;
    const gap    = 28 * scale;
    const labelH = 30 * scale;
    const fontSize = 14 * scale;

    const W = Math.max(frontCanvas.width, backCanvas.width) + pad * 2;
    const H = pad + labelH + frontCanvas.height + gap + labelH + backCanvas.height + pad;

    const combined = document.createElement('canvas');
    combined.width  = W;
    combined.height = H;
    const ctx = combined.getContext('2d')!;

    // Background
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(0, 0, W, H);

    ctx.font      = `bold ${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = '#374151';

    // Front
    ctx.fillText('FRONT', pad, pad + fontSize);
    ctx.drawImage(frontCanvas, pad, pad + labelH, frontCanvas.width, frontCanvas.height);

    // Back
    const backY = pad + labelH + frontCanvas.height + gap;
    ctx.fillText('BACK', pad, backY + fontSize);
    ctx.drawImage(backCanvas, pad, backY + labelH, backCanvas.width, backCanvas.height);

    return combined;
  }

  downloadAsImage(): void {
    this.loadingImg = true;
    const front = this.frontFaceEl.nativeElement as HTMLElement;
    const back  = this.backFaceEl.nativeElement  as HTMLElement;
    Promise.all([this.captureFace(front), this.captureFace(back)])
      .then(([f, b]) => {
        const combined = this.combineFaces(f, b);
        const link     = document.createElement('a');
        const name     = this.customerDetails?.fullName?.replace(/\s+/g, '_') || 'insurance_card';
        link.download  = `NMG_${name}.png`;
        link.href      = combined.toDataURL('image/png');
        link.click();
      })
      .finally(() => { this.loadingImg = false; });
  }

  downloadAsPDF(): void {
    this.loadingPdf = true;
    const front = this.frontFaceEl.nativeElement as HTMLElement;
    const back  = this.backFaceEl.nativeElement  as HTMLElement;
    Promise.all([this.captureFace(front), this.captureFace(back)])
      .then(([f, b]) => {
        const cardW = 440;
        const cardH = 270;
        const margin = 20;
        const lblOff = 14;
        // Single page: front top-half, back bottom-half
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [cardW + margin * 2, cardH * 2 + margin * 3 + lblOff * 2]
        });
        pdf.setFontSize(10);
        pdf.setTextColor(55, 65, 81);
        pdf.text('FRONT', margin, margin + lblOff - 2);
        pdf.addImage(f.toDataURL('image/png'), 'PNG', margin, margin + lblOff, cardW, cardH);
        const backY = margin + lblOff + cardH + margin;
        pdf.text('BACK', margin, backY + lblOff - 2);
        pdf.addImage(b.toDataURL('image/png'), 'PNG', margin, backY + lblOff, cardW, cardH);
        const name = this.customerDetails?.fullName?.replace(/\s+/g, '_') || 'insurance_card';
        pdf.save(`NMG_${name}.pdf`);
      })
      .finally(() => { this.loadingPdf = false; });
  }

}

