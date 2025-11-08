import { bootstrapApplication } from '@angular/platform-browser';
import { ROOTCONFIG } from './root.config';
import { Root } from './root';

bootstrapApplication(Root, ROOTCONFIG)
  .catch((err) => console.error(err));
