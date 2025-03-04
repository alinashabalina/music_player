import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicAvatarComponent } from './music-avatar.component';

describe('MusicAvatarComponent', () => {
  let component: MusicAvatarComponent;
  let fixture: ComponentFixture<MusicAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicAvatarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
