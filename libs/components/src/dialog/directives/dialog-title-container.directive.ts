import { CdkDialogContainer, DialogRef } from "@angular/cdk/dialog";
import { Directive, HostBinding, Input, OnInit, Optional } from "@angular/core";

// Increments for each instance of this component
let nextId = 0;

@Directive({
  selector: "[bitDialogTitleContainer]",
})
export class DialogTitleContainerDirective implements OnInit {
  @HostBinding("id") id = `bit-dialog-title-${nextId++}`;

  @Input() simple = false;

  constructor(@Optional() private dialogRef: DialogRef<any>) {}

  ngOnInit(): void {
    // Based on angular/components, licensed under MIT
    // https://github.com/angular/components/blob/14.2.0/src/material/dialog/dialog-content-directives.ts#L121-L128
    if (this.dialogRef) {
      // FIXME: Verify that this floating promise is intentional. If it is, add an explanatory comment and ensure there is proper error handling.
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      Promise.resolve().then(() => {
        const container = this.dialogRef.containerInstance as CdkDialogContainer;

        if (container && !container._ariaLabelledBy) {
          container._ariaLabelledBy = this.id;
        }
      });
    }
  }
}
