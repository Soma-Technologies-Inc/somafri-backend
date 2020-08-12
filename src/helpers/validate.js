import { check } from 'express-validator';

class Validate {

  static music() {
    return [
      check('music', 'music link is required').isLength({ min: 1 }),
    ];
  }
}

export default Validate;
