import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PostcodeSearchComponent } from "./postcode-search.component";

describe("PostcodeSearchComponent", () => {
	let component: PostcodeSearchComponent;
	let fixture: ComponentFixture<PostcodeSearchComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PostcodeSearchComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PostcodeSearchComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
