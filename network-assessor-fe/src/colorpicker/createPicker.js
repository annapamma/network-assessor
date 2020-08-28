import Pickr from '@simonwep/pickr';

/**
 * 
 * @param {Pickr.Options} pickrOptions 
 */
export const createPicker = (pickrOptions, {
  onSave
}) => {
  const pickr = new Pickr(pickrOptions)
  pickr.on('save', c => {
    onSave(c.toHEXA().toString())
  })
  return pickr
}
