import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestOptions } from '../../shared/test-data/options';
import { SelectedFiltersComponent } from './selected-filters.component';

describe('SelectedFiltersComponent', () => {
  let component: SelectedFiltersComponent;
  let fixture: ComponentFixture<SelectedFiltersComponent>;
  let testOptions: TestOptions;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedFiltersComponent],
      providers: [TestOptions]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedFiltersComponent);
    component = fixture.componentInstance;
    testOptions = this.testOptions;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return an array of all matching elements', () => {
    const matchCount = component.matchTags(
      testOptions.types,
      testOptions.selectedTypes
    );
    expect(matchCount.length).toBe(2);
  });
});
