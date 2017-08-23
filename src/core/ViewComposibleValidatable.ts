import {ComposibleValidatable} from "./types";
import {ViewValidatable} from "./ViewValidatable";

export abstract class ViewComposibleValidatable<Wrapped, TValue>
  extends ViewValidatable<Wrapped, TValue>
  implements ComposibleValidatable<TValue> {

  protected wrapped: ComposibleValidatable<Wrapped>;
  protected to: (t: Wrapped) => TValue;

  constructor(wrapped: ComposibleValidatable<Wrapped>, to: (t: Wrapped) => TValue) {
    super(wrapped, to);
    this.wrapped = wrapped;
    this.to = to;
  };

  on$ChangeAfterValidation() {
    return this.wrapped.on$ChangeAfterValidation()
  };

  on$Reinit() {
    this.wrapped.on$Reinit()
  }

  setCompositionParent(c: { on$ChangeAfterValidation: () => void; on$Reinit: () => void; }) {
    return this.wrapped.setCompositionParent(c)
  };
}
