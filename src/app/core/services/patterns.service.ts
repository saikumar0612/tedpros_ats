//changing job title pattern --suresh-- 08-13-2019 start 

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatternsService {

  constructor() { }

  jobTitlePattern =  "^(?!.*[.&*-]{2})([a-zA-Z0-9.&*-]+[^\s])*[a-zA-Z0-9.&*-]+$";
  addressPattern = "^([a-zA-Z0-9.,&*-_#()/]+[^\s])*[a-zA-Z0-9.,&*-_#()/]+$";
  twitterPattern = "(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)?twitter\.com\/[A-z0-9_]+\/?";
  linkedInPattern = "(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?";
  facebbokPattern = "(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)?(facebook|fb)\.com\/[A-z0-9_.-]+\/?";
  websitePattern = "^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+$";
  companyNamePattern = "^(?!.*[.&!@#()+-/_*]{2})([a-zA-Z0-9.,&!@#()+-/_*]+[^\s])*[a-zA-Z0-9.,&!@#()+-/_*]+$";
  branchNamePattern = "^(?!.*[!#%_.,@&*-]{2})([a-zA-Z0-9!#%_.,@&*-]+[^\s])*[a-zA-Z0-9!#%_.,@&*-]+$";
  kpiIndicatorPattern = "^(?!.*[!#%_.,@&*-]{2})([a-zA-Z0-9!#%_.,@&*-]+[^\s])*[a-zA-Z0-9!#%_.,@&*-]+$"
  // pattern="^(?!.*[!#%_.@&*-]{2})([a-zA-Z0-9!#%_.@&*-]+[\s])*[a-zA-Z0-9!#%_.@&*-]+$"
}
// changing job title pattern --suresh-- 08-13-2019 end