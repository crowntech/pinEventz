import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../../_services/board.service';
import { Board } from '../../_models/board.interface';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {
  event: any;
  reverse = true;
  pinned: any;

  constructor(private route: ActivatedRoute, private boardService: BoardService) { }
  board: Board;

  ngOnInit() {
    this.route.paramMap.subscribe(
      paramMap => {
        this.boardService.getBoardById(paramMap.get('_id')).subscribe(
          data => {
            console.log(data);
            this.board = data;
            this.event = data.events;
            this.pinned = data.pinneds;
            console.log(this.pinned);
          }
        );
      }
    );
  }

}
