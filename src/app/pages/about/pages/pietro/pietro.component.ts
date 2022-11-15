import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { FirebaseExtendedService } from 'src/app/shared/services/firebase-extended.service';
import { Certification, Curriculum } from './models/curriculum.model';
import { jsPDF } from 'jspdf';
import { PdfComponent } from './components/pdf/pdf.component';

@Component({
  templateUrl: './pietro.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PietroComponent implements OnInit, OnDestroy {
  @ViewChild("pdfContainer", { read: ViewContainerRef }) container: ViewContainerRef | undefined;

  MARGIN_TOP = 5;
  MARGIN_BOTTOM = 20;
  
  birthday = new Date(929829600000); // new Date('1999, 06, 20');

  curriculum: Curriculum = {
    name: 'Pietro Lungarini',
    desc: `Ho ${this.normAge()} anni e vengo da Cesena, una piccola città dell'Emilia-Romagna. Assieme a mio fratello ho scoperto la subacquea nel 2018 e da quell'anno non abbiamo mai smesso di immergerci negli abissi! Da Freelancer, ho intrapreso un lungo percorso di continua evoluzione. Grazie alla mia curiosità ho infatti acquisito competenze sotto tantissimi aspetti.`,
    stories: [
      {
        title: 'Videomaker e Fotografo - Freelancer',
        desc: 'All\'età di 16 anni ho iniziato a fare i miei primi video per artisti e cantanti della zona. Ciò che iniziai per scherzo diventò un vero e proprio lavoro nel corso degli anni. Ho continuato a fare video fino al 2019. Questa opportunità mi ha dato modo di conoscere anche il mondo della Fotografia e della Grafica digitale. In questi anni d\'oro ho realizzato video musicali e pubblicitari per tantissimi artisti e aziende, molti dei quali sono ancora disponibili su YouTube cercando il mio nome.',
        isWorkingExperience: true,
        time: new Date(1443650400000), //new Date('2015, 10, 1'),
      },
      {
        title: 'Chief Digital Officer (CDO) @ Mayp Digital S.R.L.',
        desc: 'In quinta superiore, tre ragazzi vennero da me per chiedermi di realizzagli un video pubblicitario per la loro nuova startup. Il mio lavoro ha superato le loro aspettative e hanno voluto a tutti i costi che entrassi anche io nel progetto. Mi ritrovai in una realtà lavorativa completamente diversa e ho avuto modo di combinare le mie competenze grafiche con nuovi settori. Pian piano imparai a programmare siti web e mi specializzai nel Frontend (la parte grafica del sito).<br><br><b>Altre competenze che ho sviluppato sono:</b><br>- Gestione dei social media;<br>- Creazione di campagne pubblicitarie;<br>- Competenze commerciali e amministrative;<br>- Customer relationship management (CRM);<br>- Project management;<br>- Email Marketing;<br>- Relazioni con clienti all\'estero.',
        isWorkingExperience: true,
        time: new Date(1530396000000), //new Date('2018, 07, 1'),
      },
      {
        title: 'SSI Open Water Diver',
        desc: 'In un viaggio di famiglia alle Maldive, io e mio fratello, ci siamo ritrovati su un isola. Non sapevamo bene cosa fare durante il giorno e abbiamo scoperto che vicino la spiaggia dell\'isola c\'era un Diving Center. Ci siamo informati e un\'immersione dopo l\'altra abbiamo preso il nostro primo brevetto subacqueo. L\'emozione era altissima, ma ancora forse non avevamo capito dove ci avrebbe portato...',
        isWorkingExperience: false,
        time: new Date(1535752800000), //new Date('2018, 09, 1'),
      },
      {
        title: 'PADI® Advanced Open Water Diver',
        desc: 'Un\'anno dopo abbiamo scoperto, in Puglia, <span class="text-indigo-500 cursor-pointer">Orca Diving Center</span>. Abbiamo fatto il nostro secondo corso subacqueo! L\'Advanced Open Water Diver. Qui non solo abbiamo scoperto la migliore didattica subacquea al mondo, ma abbiamo conosciuto anche Grazia Palmisano ed Enzo Volpicelli. Coloro che ad oggi ci hanno portato poi fino ad essere Istruttori.',
        isWorkingExperience: false,
        time: new Date(1567288800000), //new Date('2019, 09, 1'),
      },
      {
        title: 'PADI® Rescue Diver',
        desc: 'L\'anno successivo non abbiamo resistito e siamo diventati Rescue Diver presso <span class="text-indigo-500 cursor-pointer">Orca Diving Center</span>. Questo corso ci ha dato l\'opportunità di sviluppare al meglio le abilità di soccorso richieste dal mondo della Subacquea.',
        isWorkingExperience: false,
        time: new Date(1598911200000), //new Date('2020, 09, 1'),
      },
      {
        title: 'Angular Frontend Engeneer - Freelancer',
        desc: 'Nell\'ottobre del 2020 decisi di lavorare autonomamente per concentrarmi su altri progetti, prendendo una strada diversa da quella di Mayp Digital. Qui misi in pratica tutte le competenze acquisite in Mayp e ne sviluppai di nuove. Mi sono ritrovato a lavorare con clienti da ogni parte del globo per realizzare piattaforme web e siti di ogni genere. Questo sito, in effetti, è stato realizzato con migliaia di linee di codice dal sottoscritto, partendo completamente da zero. Porto avanti in sordina questo lavoro tutt\'oggi perchè trovo che programmare abbia davvero qualcosa di magico.',
        isWorkingExperience: true,
        time: new Date(1604185200000), //new Date('2020, 11, 1'),
      },
      {
        title: 'Trader & Content Creator - Freelancer',
        desc: 'Le passioni sono tante... Nel Maggio del 2021 ho infatti scoperto il mondo della Finanza e collaborato come Commerciale in un\'azienda di Educazione Finanziaria. Ho costruito un vero e proprio Personal Brand in pochi mesi, creando un profilo TikTok che ha raggiunto <b>milioni</b> di persone in tutta Italia (@wheresbebo su TikTok). Tutt\'ora questa rimane una mia passione e un mio lavoro. È soprattutto grazie a questo mondo che sono riuscito a permettermi di investire migliaia e migliaia di euro nella mia formazione come subacqueo.',
        isWorkingExperience: true,
        time: new Date(1621980000000), //new Date('2021, 05, 26'),
      },
      {
        title: 'PADI® Master Scuba Diver',
        desc: 'Tornando in Puglia ci siamo resi conto che volevamo specializzarci in alcune specialità PADI e così ci siamo organizzati con i nostri istruttori presso <span class="text-indigo-500 cursor-pointer">Orca Diving Center</span> a conseguire 5 specialità (richieste per questo riconoscimento). A quanto pare 5 non bastavano per le nostre anime curiose e quindi ne siamo usciti con 8!',
        isWorkingExperience: false,
        time: new Date(1622498400000), //new Date('2021, 06, 1'),
      },
      {
        title: 'PADI® Divemaster',
        desc: 'Presso il nostro centro di fiducia, assieme ai nostri istruttori Grazia Palmisano ed Enzo Volpicelli, abbiamo iniziato il corso PADI Divemaster. Questa volta però gli obiettivi erano chiari. Volevamo assolutamente diventare istruttori. Abbiamo passato metà mese di Maggio e i mesi di Giugno, Luglio, Settembre e Ottobre 2021 all\'interno di <span class="text-indigo-500 cursor-pointer">Orca Diving Center</span> ottenendo un\'esperienza inestimabile di internato.<br><br><b>Abbiamo lavorato sodo imparando cosa vuol dire:</b><br>- Gestire la logistica di un\'immersione;<br>- Gestire l\'accoglienza di nuovi clienti nel Diving;<br>- Preparare l\'attrezzatura per i clienti;<br>- Caricare e controllare le bombole per l\'immersione;<br>- Realizzare briefing adatti al sito di immersione;<br>- Assistere i clienti del Diving in superficie e sott\'acqua.',
        isWorkingExperience: true,
        time: new Date(1651356000000), //new Date('2022, 05, 1'),
      },
      {
        title: 'PADI/DAN DEEP-X Diver',
        desc: 'Mentre stavamo terminando il corso Divemaster abbiamo anche pensato di conseguire la specialità di Operatore Compressori Coltri® per essere abilitati alla manutenzione ordinaria di questi compressori. Abbiamo anche imparato ad installare correttamente un compressore Coltri e a seguire le raccomandazioni di DAN Research riguardo alla Qualità dell\'Aria e ai controlli periodici della stessa.',
        isWorkingExperience: true,
        time: new Date(1656626400000), //new Date('2022, 07, 1'),
      },
      {
        title: 'PADI/DAN COLTRI Compressor Operator',
        desc: 'Sempre durante il corso Divemaster abbiamo deciso di specializzarci anche nella specialità "DEEP-X" che ci abilità ad eseguire una sosta decompressiva limitata di 5 minuti. Abbiamo anche imparato a registrare le nostre immersioni tramite il sistema di ricerca DAN per inoltrarle a favore di studi scientifici.',
        isWorkingExperience: true,
        time: new Date(1661983200000), //new Date('2022, 09, 1'),
      },
      {
        title: 'PADI® Open Water Scuba Instructor',
        desc: 'Una volta terminato il corso Divemaster, allegato da un\'esperienza di +100 immersioni di addestramento e quasi 4 mesi di sudate, ci siamo ritrovati ad Ottobre. Grazia ed Enzo ci avevano parlato dell\'Esame Istruttori e senza troppe esitazioni abbiamo deciso di partecipare. È stata in assoluto l\'esperienza di Formazione più intensa della mia vita. Tre settimane di full-immersion con ben <b>DUE Course Director</b> per attendere l\'esame che ci aspettava a fine mese. Il 30 Ottobre il carissimo Roberto Raffaeli (esaminatore qualificato da PADI) ci ha ufficialmente rilasciato il certificato di superamento dell\'esame, che ci ha permesso di ottenere la certificazione di Open Water Scuba Instructor.<br><br>Durante il corso istruttori (IDC) abbiamo anche completato alcune certificazioni come per esempio: EFR Instructor, Enriched Air Instructor, Dry Suit Instructor ed Emergency Oxygen Provider Instructor.',
        isWorkingExperience: true,
        time: new Date(1667080800000), //new Date('2022, 10, 30'),
      },
      {
        title: 'La storia continua...',
        desc: 'Questo è solo l\'inizio di ciò che vogliamo creare e speriamo davvero che tu ne possa fare parte assieme a noi :)',
        isWorkingExperience: false,
        time: new Date(),
      },
    ],
    specs: {
      passions: [
        'Progettazione grafica per il digitale',
        'Realizzazione di video, montaggio e coloring',
        'Programmazione di applicativi web',
        'Vendita di prodotti e servizi',
        'Email Marketing',
        'Gestione social media',
        'Installazione e manutenzione di un Compressore COLTRI',
      ],
      lang: [
        { flag: 'it', name: 'Italiano', level: 1 },
        { flag: 'en', name: 'Inglese', level: 2 },
        { flag: 'de', name: 'Tedesco', level: 4 },
      ],
    },
    certs: [],
    contacts: {
      email: 'pietro@lungarini.it',
      phone: '+393349447086'
    },
  };

  certsSub: Subscription | undefined;
  downloadState: 'off' | 'downloading' | 'completed' = 'off';

  constructor(
    private db: FirebaseExtendedService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.certsSub = this.db.getCol<Certification>('certifications/pietro/certs').subscribe(certs => {
      this.curriculum.certs = certs.sort((a, b) => (a.isPro ? a?.priority || 40 : 50) - (b.isPro ? b?.priority || 40 : 50));
      this.cdRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.certsSub?.unsubscribe();
  }

  normAge(): number {
    const myMonth = this.birthday.getMonth() + 1;
    const myDay = this.birthday.getDate();
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const res = year - this.birthday.getFullYear();
    return (month < myMonth) ? res - 1 : (month === myMonth) ? day < myDay ? res - 1 : res : res;
  }

  generatePdf() {
    const doc = new jsPDF('p', 'px', 'a4');
    if (!this.container) return;
    this.downloadState = 'downloading';
    const pdfContentRef = this.container.createComponent(PdfComponent);
    const pdfContent = pdfContentRef.instance;
    pdfContent.visible = false;
    pdfContent.curriculum = this.curriculum;
    
    const sub = pdfContent.loaded
      .pipe(delay(1))
      .subscribe(() => {
        const cvEl = pdfContent.cvElement?.nativeElement;
        const setFamily = (element: HTMLElement) => {
          const len = element.children.length || 0;
          if (len <= 0) return;
          for (let i = 0; i < len; i++) {
            const e = element.children.item(i) as HTMLElement | null
            if (e) {
              if (['h1', 'h2', 'h3'].indexOf(e.nodeName.toLowerCase()) !== -1) {
                if (e.nodeName.toLowerCase() === 'h1') e.style.fontFamily = '"Times", sans-serif';
                return;
              };
              e.style.fontFamily = '"helvetica", sans-serif';
              setFamily(e);
            };
          }
        };
        if (cvEl) setFamily(cvEl);
        console.log(doc.getFontList())
        if (!cvEl) {
          this.container?.remove();
          sub.unsubscribe();
          return console.error('CV is undefined');
        };
        doc.html(cvEl.outerHTML, {
          html2canvas: {
            scale: 0.3434,
            svgRendering: true,
            letterRendering: true,
          },
          margin: [this.MARGIN_TOP, 0, this.MARGIN_BOTTOM, 0],
          width: 1300,
          windowWidth: 1300,
          autoPaging: 'text',
          callback: (doc) => {
            doc.setLanguage('it');
            const addFooter = () => {
              const pageCount = doc.getNumberOfPages();
              for (var i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                const text = `Pagina ${i} di ${pageCount} - Curriculum ${this.curriculum.name} - &copy; ${new Date().getFullYear()} LUNGABROS`;
                const xOffset = ((doc.internal.pageSize.width) - (doc.getStringUnitWidth(text))) - 10;
                doc.setFontSize(5);
                doc.text(text, xOffset, doc.internal.pageSize.height - (this.MARGIN_BOTTOM / 2), {
                  align: 'right',
                });
              }
            };
            addFooter();
            this.downloadState = 'completed';
            this.cdRef.detectChanges();
            doc.save(`Curriculum - ${this.curriculum.name}`);
            setTimeout(() => {
              this.downloadState = 'off';
              this.cdRef.detectChanges();
            }, 3000);
            sub.unsubscribe();
            this.container?.remove();
          },
        });
      })
  }

}
