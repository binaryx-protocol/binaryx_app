import {TValidatorResult} from 'elegant-validator'

const ElegantValidator = require('elegant-validator')
const defaultValidators = require('elegant-validator/src/defaultValidators')
const defaultMessagesEn = require('elegant-validator/src/defaultMessagesEn')

const ev = new ElegantValidator(defaultValidators, defaultMessagesEn)

const isEOA = ({value}): null | string => {
  if (!value.match(/0x[0-9a-fA-F]{40}/)) {
    return "Invalid"
  }
  return null;
}

const looksLikeAString = ['required', 'length:2:255']
const numeric = ['required', 'isNumeric']

const schema = {
  scAddress: ['required', isEOA],
  scId: ['required'],
  cTitle: looksLikeAString,
  cStatus: looksLikeAString,
  landType: looksLikeAString,
  landArea: numeric,
  propertyType: looksLikeAString,
  propertyArea: looksLikeAString,
  beds: numeric,
  bedrooms: numeric,
  roomsTotal: numeric,
  kitchens: numeric,
  livingRooms: numeric,
  terraces: numeric,
  balconies: numeric,
  garages: numeric,
  bathRooms: numeric,
  occupation: looksLikeAString,
  images: ['required', 'arrayLength:1'],
  documents: ['required', 'arrayLength:1'],
  averageCoCPercentage: numeric,
  projectedIrrPercentage: numeric,
  taxesPercentage: numeric,
  insurancePercentage: numeric,
  propertyManagementPercentage: numeric,
  utilitiesPercentage: numeric,
  llcAdministrationFeePercentage: numeric,
}

export const validate = (formData): Promise<TValidatorResult> => ev.isValid(formData, schema)
