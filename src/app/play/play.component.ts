import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalResultadoComponent } from '../modal-resultado/modal-resultado.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  pontuacaoVoce: number = 0
  pontuacaoComputador: number = 0
  carregando: boolean = true
  movaAqui: boolean = true
  imgPC = ''
  idPC = ''
  resultado: string = ''
  ListOpcoesPadrao = [
    {id: 'pedra', img: 'assets/pedra.png'},
    {id: 'papel', img: 'assets/papel.png'},
    {id: 'tesoura', img: 'assets/tesoura.png'},
  ]
  ListOpcoes = [
    {id: 'pedra', img: 'assets/pedra.png'},
    {id: 'papel', img: 'assets/papel.png'},
    {id: 'tesoura', img: 'assets/tesoura.png'},
  ]
  ListOpcoes2 = [
    {id: 'pedra', img: 'assets/pedra2.png'},
    {id: 'papel', img: 'assets/papel2.png'},
    {id: 'tesoura', img: 'assets/tesoura2.png'},
  ]
  ListAcao = [{id:'',img:''}]

  constructor(private _router: Router, private _dialog: MatDialog) { }

  ngOnInit(): void {}

  drop(event: CdkDragDrop<any>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.movaAqui=false
      this.ListAcao.splice(0,1)
      this.sorteio()
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.calculaVencedor()
    setTimeout(() => {
      this.abrirResultado()
    }, 550);
  }

  sorteio(){
    var index = Math.floor(Math.random() * 3)
    this.imgPC = this.ListOpcoes2[index].img
    this.idPC = this.ListOpcoes2[index].id
    this.carregando=false
  }
  
  calculaVencedor(){

    var jogada = this.ListAcao[0].id
    if(this.idPC == 'papel' && jogada == 'papel'){
        this.resultado = 'empate'
    }
     else if(this.idPC == 'papel' && jogada == 'tesoura'){
      this.resultado = 'tesoura'
        this.pontuacaoVoce += 1
      }
      else if(this.idPC == 'papel' && jogada == 'pedra'){
        this.resultado = 'papel'
        this.pontuacaoComputador += 1
      }
    else if(this.idPC == 'tesoura' && jogada == 'tesoura'){
      this.resultado = 'empate'
      }
      else if (this.idPC == 'tesoura' && jogada == 'papel'){
        this.resultado = 'tesoura'
        this.pontuacaoComputador += 1
      }
      else if (this.idPC == 'tesoura' && jogada == 'pedra'){
        this.resultado = 'pedra'
        this.pontuacaoVoce += 1
      }
      else if (this.idPC == 'pedra' && jogada == 'pedra'){
        this.resultado = 'empate'
      }
      else if (this.idPC == 'pedra' && jogada == 'papel'){
        this.resultado = 'papel'
        this.pontuacaoVoce += 1
      }
      else if (this.idPC == 'pedra' && jogada == 'tesoura'){
        this.resultado = 'pedra'
        this.pontuacaoComputador += 1
      }
  }
  abrirResultado(){
    var dialogRef = this._dialog.open(ModalResultadoComponent, {width: '300px', data: this.resultado})
    dialogRef.afterClosed().subscribe( _ => {
      this.carregando=true
      this.movaAqui=true
      this.ListOpcoes = this.ListOpcoesPadrao.slice()
    })
  }
  sair(){
    this._router.navigate(['/menu'])
  }
}




