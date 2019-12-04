import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ApplyLeaveComponent } from './apply-leave.component';
import { HttpModule } from '@angular/http';
import { UserServiceStub } from '../../mocks/UserServiceStub';
import { UserService } from '../../core/services/user.service';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ng2-validation';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RouterTestingModule } from '@angular/router/testing';
import { map } from 'rxjs/operators';
import { DataTableModule } from 'angular-6-datatable';

describe('ApplyLeaveComponent', () => {
  let component: ApplyLeaveComponent;
  let fixture: ComponentFixture<ApplyLeaveComponent>;
  const userService = new UserServiceStub();
  const leaveData = [{
    user: {
      userId: 'SMU1030',
      firstName: 'dany',
      lastName: 'Smith',
      emailId: 'dany@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMU1004',
      firstName: 'Mike',
      lastName: 'Jones',
      emailId: 'pavankumargarimella91@gmail.com',
      phoneNo: '8765345672'
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMU1005',
      firstName: 'gorge',
      lastName: 'relex',
      emailId: 'jorge@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMU1004',
      firstName: 'Mike',
      lastName: 'Jones',
      emailId: 'pavankumargarimella91@gmail.com',
      phoneNo: '8765345672'
    },
    role_name: '',
    leave_type: {
      id: '4',
      name: 'maternity leaves',
      situational: '0',
      country: {
        id: '72',
        name: 'Faroe Islands'
      }
    }
  },
  {
    user: {
      userId: 'SMU1003',
      firstName: 'Administrator',
      lastName: '',
      emailId: 'smlogics01+1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMU1019',
      firstName: 'Peter',
      lastName: 'Ethan',
      emailId: 'basolutionsa@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMU1013',
      firstName: 'Amy',
      lastName: 'Jackson',
      emailId: 'amar.basolutions@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: '1',
      firstName: 'David',
      lastName: 'jackson',
      emailId: 'pavan.basolutions@gmail.com',
      phoneNo: '9963968745'
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMU1011',
      firstName: 'Amarendra',
      lastName: 'Kotipalli',
      emailId: 'amarendara@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMU1012',
      firstName: 'Sharmistha',
      lastName: 'Biswas',
      emailId: 'sharmistha.basolutions@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMU1014',
      firstName: 'Saigeeta',
      lastName: 'Konchada',
      emailId: 'geeta.basolutions@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMU1022',
      firstName: 'sujatha',
      lastName: 'p',
      emailId: 'sujatha.basolutions@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMU1024',
      firstName: 'Fidel',
      lastName: 'Martin',
      emailId: 'pavan@basolutions.in',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMU1018',
      firstName: 'Frank',
      lastName: 'Daniel',
      emailId: 'evie_1256@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: '1',
      firstName: 'David',
      lastName: 'jackson',
      emailId: 'pavan.basolutions@gmail.com',
      phoneNo: '9963968745'
    },
    role_name: '',
    leave_type: {
      id: '2',
      name: 'Sick Leave',
      situational: '0',
      country: {
        id: '2',
        name: 'Albania'
      }
    }
  },
  {
    user: {
      userId: 'SMU1005',
      firstName: 'gorge',
      lastName: 'relex',
      emailId: 'jorge@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMU1013',
      firstName: 'Amy',
      lastName: 'Jackson',
      emailId: 'amar.basolutions@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '4',
      name: 'maternity leaves',
      situational: '0',
      country: {
        id: '72',
        name: 'Faroe Islands'
      }
    }
  },
  {
    user: {
      userId: 'SMU1027',
      firstName: 'James',
      lastName: 'Johnson',
      emailId: 'bharatkumar.basolutions@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMU1027',
      firstName: 'James',
      lastName: 'Johnson',
      emailId: 'bharatkumar.basolutions@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMU1027',
      firstName: 'James',
      lastName: 'Johnson',
      emailId: 'bharatkumar.basolutions@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMU1030',
      firstName: 'dany',
      lastName: 'Smith',
      emailId: 'dany@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMU1030',
      firstName: 'dany',
      lastName: 'Smith',
      emailId: 'dany@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMU1030',
      firstName: 'dany',
      lastName: 'Smith',
      emailId: 'dany@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: '1',
      firstName: 'David',
      lastName: 'jackson',
      emailId: 'pavan.basolutions@gmail.com',
      phoneNo: '9963968745'
    },
    role_name: '',
    leave_type: {
      id: '5',
      name: 'Paternity leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'SMU1004',
      firstName: 'Mike',
      lastName: 'Jones',
      emailId: 'pavankumargarimella91@gmail.com',
      phoneNo: '8765345672'
    },
    role_name: '',
    leave_type: {
      id: '5',
      name: 'Paternity leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'SMVE3002019',
      firstName: 'Jules',
      lastName: 'Boutin',
      emailId: 'smlogics16+1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMVE3002019',
      firstName: 'Jules',
      lastName: 'Boutin',
      emailId: 'smlogics16+1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMVE3002019',
      firstName: 'Jules',
      lastName: 'Boutin',
      emailId: 'smlogics16+1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMVE3002020',
      firstName: 'John',
      lastName: 'Klok',
      emailId: 'smlogics15+1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMVE3002020',
      firstName: 'John',
      lastName: 'Klok',
      emailId: 'smlogics15+1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMVE3002020',
      firstName: 'John',
      lastName: 'Klok',
      emailId: 'smlogics15+1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMV11255',
      firstName: 'Fidel',
      lastName: 'Martin',
      emailId: 'smlogics17+1@gmail.com',
      phoneNo: '9768054310'
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMV11255',
      firstName: 'Fidel',
      lastName: 'Martin',
      emailId: 'smlogics17+1@gmail.com',
      phoneNo: '9768054310'
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMV11255',
      firstName: 'Fidel',
      lastName: 'Martin',
      emailId: 'smlogics17+1@gmail.com',
      phoneNo: '9768054310'
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'v9681',
      firstName: 'nikki',
      lastName: 'jones',
      emailId: 'nikki@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'v9681',
      firstName: 'nikki',
      lastName: 'jones',
      emailId: 'nikki@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'v9681',
      firstName: 'nikki',
      lastName: 'jones',
      emailId: 'nikki@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'v9681',
      firstName: 'nikki',
      lastName: 'jones',
      emailId: 'nikki@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'v9681',
      firstName: 'nikki',
      lastName: 'jones',
      emailId: 'nikki@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1286',
      firstName: 'jonty',
      lastName: 'rodes',
      emailId: 'jonty@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1286',
      firstName: 'jonty',
      lastName: 'rodes',
      emailId: 'jonty@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMU1019',
      firstName: 'Peter',
      lastName: 'Ethan',
      emailId: 'basolutionsa@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '7',
      name: 'Jury Duty Leave',
      situational: '0',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'gst1287',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'rkanuri3@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '7',
      name: 'Jury Duty Leave',
      situational: '0',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'SMU1019',
      firstName: 'Peter',
      lastName: 'Ethan',
      emailId: 'basolutionsa@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'gst1288',
      firstName: 'amar',
      lastName: 'kotopalli',
      emailId: 'smlogics1+1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1288',
      firstName: 'amar',
      lastName: 'kotopalli',
      emailId: 'smlogics1+1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1288',
      firstName: 'amar',
      lastName: 'kotopalli',
      emailId: 'smlogics1+1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1288',
      firstName: 'amar',
      lastName: 'kotopalli',
      emailId: 'smlogics1+1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1290',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'smlogics3+1@gmail.com',
      phoneNo: '2345678901'
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1290',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'smlogics3+1@gmail.com',
      phoneNo: '2345678901'
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1290',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'smlogics3+1@gmail.com',
      phoneNo: '2345678901'
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1290',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'smlogics3+1@gmail.com',
      phoneNo: '2345678901'
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1290',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'smlogics3+1@gmail.com',
      phoneNo: '2345678901'
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'gst1289',
      firstName: 'satya',
      lastName: 't',
      emailId: 'smlogics2+1@gmail.com',
      phoneNo: '+767-5645645654'
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'v9681',
      firstName: 'nikki',
      lastName: 'jones',
      emailId: 'nikki@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'gst1290',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'smlogics3+1@gmail.com',
      phoneNo: '2345678901'
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: '1',
      firstName: 'David',
      lastName: 'jackson',
      emailId: 'pavan.basolutions@gmail.com',
      phoneNo: '9963968745'
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'SMU1012',
      firstName: 'Sharmistha',
      lastName: 'Biswas',
      emailId: 'sharmistha.basolutions@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'SMU1022',
      firstName: 'sujatha',
      lastName: 'p',
      emailId: 'sujatha.basolutions@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'SMU1024',
      firstName: 'Fidel',
      lastName: 'Martin',
      emailId: 'pavan@basolutions.in',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'SMU1027',
      firstName: 'James',
      lastName: 'Johnson',
      emailId: 'bharatkumar.basolutions@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'SMU1030',
      firstName: 'dany',
      lastName: 'Smith',
      emailId: 'dany@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'SMVE3002019',
      firstName: 'Jules',
      lastName: 'Boutin',
      emailId: 'smlogics16+1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'SMVE3002020',
      firstName: 'John',
      lastName: 'Klok',
      emailId: 'smlogics15+1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'gst1288',
      firstName: 'amar',
      lastName: 'kotopalli',
      emailId: 'smlogics1+1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'SMU1013',
      firstName: 'Amy',
      lastName: 'Jackson',
      emailId: 'amar.basolutions@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '2',
      name: 'Sick Leave',
      situational: '0',
      country: {
        id: '2',
        name: 'Albania'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'SMU1023',
      firstName: 'Pavan',
      lastName: 'Garimella',
      emailId: 'amar_kotipalli1981@yahoo.co.in',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: '1',
      firstName: 'David',
      lastName: 'jackson',
      emailId: 'pavan.basolutions@gmail.com',
      phoneNo: '9963968745'
    },
    role_name: '',
    leave_type: {
      id: '3',
      name: 'marriage leave',
      situational: '0',
      country: {
        id: '30',
        name: 'Brazil'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '3',
      name: 'marriage leave',
      situational: '0',
      country: {
        id: '30',
        name: 'Brazil'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '3',
      name: 'marriage leave',
      situational: '0',
      country: {
        id: '30',
        name: 'Brazil'
      }
    }
  },
  {
    user: {
      userId: 'SMU1012',
      firstName: 'Sharmistha',
      lastName: 'Biswas',
      emailId: 'sharmistha.basolutions@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '3',
      name: 'marriage leave',
      situational: '0',
      country: {
        id: '30',
        name: 'Brazil'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '3',
      name: 'marriage leave',
      situational: '0',
      country: {
        id: '30',
        name: 'Brazil'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '3',
      name: 'marriage leave',
      situational: '0',
      country: {
        id: '30',
        name: 'Brazil'
      }
    }
  },
  {
    user: {
      userId: 'SMU1022',
      firstName: 'sujatha',
      lastName: 'p',
      emailId: 'sujatha.basolutions@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '3',
      name: 'marriage leave',
      situational: '0',
      country: {
        id: '30',
        name: 'Brazil'
      }
    }
  },
  {
    user: {
      userId: 'SMU1024',
      firstName: 'Fidel',
      lastName: 'Martin',
      emailId: 'pavan@basolutions.in',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '3',
      name: 'marriage leave',
      situational: '0',
      country: {
        id: '30',
        name: 'Brazil'
      }
    }
  },
  {
    user: {
      userId: 'SMU1027',
      firstName: 'James',
      lastName: 'Johnson',
      emailId: 'bharatkumar.basolutions@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '3',
      name: 'marriage leave',
      situational: '0',
      country: {
        id: '30',
        name: 'Brazil'
      }
    }
  },
  {
    user: {
      userId: 'SMU1030',
      firstName: 'dany',
      lastName: 'Smith',
      emailId: 'dany@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '3',
      name: 'marriage leave',
      situational: '0',
      country: {
        id: '30',
        name: 'Brazil'
      }
    }
  },
  {
    user: {
      userId: 'SMVE3002019',
      firstName: 'Jules',
      lastName: 'Boutin',
      emailId: 'smlogics16+1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '3',
      name: 'marriage leave',
      situational: '0',
      country: {
        id: '30',
        name: 'Brazil'
      }
    }
  },
  {
    user: {
      userId: 'SMVE3002020',
      firstName: 'John',
      lastName: 'Klok',
      emailId: 'smlogics15+1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '3',
      name: 'marriage leave',
      situational: '0',
      country: {
        id: '30',
        name: 'Brazil'
      }
    }
  },
  {
    user: {
      userId: 'gst1288',
      firstName: 'amar',
      lastName: 'kotopalli',
      emailId: 'smlogics1+1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '3',
      name: 'marriage leave',
      situational: '0',
      country: {
        id: '30',
        name: 'Brazil'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: null,
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12429',
      firstName: 'ABHILASH',
      lastName: 'BANDA',
      emailId: 'smlogics29@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12429',
      firstName: 'ABHILASH',
      lastName: 'BANDA',
      emailId: 'smlogics29@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12429',
      firstName: 'ABHILASH',
      lastName: 'BANDA',
      emailId: 'smlogics29@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12429',
      firstName: 'ABHILASH',
      lastName: 'BANDA',
      emailId: 'smlogics29@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12429',
      firstName: 'ABHILASH',
      lastName: 'BANDA',
      emailId: 'smlogics29@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12429',
      firstName: 'ABHILASH',
      lastName: 'BANDA',
      emailId: 'smlogics29@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12429',
      firstName: 'ABHILASH',
      lastName: 'BANDA',
      emailId: 'smlogics29@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12429',
      firstName: 'ABHILASH',
      lastName: 'BANDA',
      emailId: 'smlogics29@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12429',
      firstName: 'ABHILASH',
      lastName: 'BANDA',
      emailId: 'smlogics29@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12430',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics28@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12430',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics28@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12430',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics28@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12430',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics28@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12430',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics28@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12430',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics28@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12430',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics28@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12430',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics28@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12430',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics28@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12431',
      firstName: 'Rohitha',
      lastName: 'Dasari',
      emailId: 'smlogics27@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12431',
      firstName: 'Rohitha',
      lastName: 'Dasari',
      emailId: 'smlogics27@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12431',
      firstName: 'Rohitha',
      lastName: 'Dasari',
      emailId: 'smlogics27@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12431',
      firstName: 'Rohitha',
      lastName: 'Dasari',
      emailId: 'smlogics27@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12431',
      firstName: 'Rohitha',
      lastName: 'Dasari',
      emailId: 'smlogics27@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12431',
      firstName: 'Rohitha',
      lastName: 'Dasari',
      emailId: 'smlogics27@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12431',
      firstName: 'Rohitha',
      lastName: 'Dasari',
      emailId: 'smlogics27@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12431',
      firstName: 'Rohitha',
      lastName: 'Dasari',
      emailId: 'smlogics27@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12431',
      firstName: 'Rohitha',
      lastName: 'Dasari',
      emailId: 'smlogics27@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12432',
      firstName: 'Curtis',
      lastName: 'Davis',
      emailId: 'smlogics26@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12432',
      firstName: 'Curtis',
      lastName: 'Davis',
      emailId: 'smlogics26@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12432',
      firstName: 'Curtis',
      lastName: 'Davis',
      emailId: 'smlogics26@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12432',
      firstName: 'Curtis',
      lastName: 'Davis',
      emailId: 'smlogics26@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12432',
      firstName: 'Curtis',
      lastName: 'Davis',
      emailId: 'smlogics26@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12432',
      firstName: 'Curtis',
      lastName: 'Davis',
      emailId: 'smlogics26@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12432',
      firstName: 'Curtis',
      lastName: 'Davis',
      emailId: 'smlogics26@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12432',
      firstName: 'Curtis',
      lastName: 'Davis',
      emailId: 'smlogics26@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12432',
      firstName: 'Curtis',
      lastName: 'Davis',
      emailId: 'smlogics26@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12433',
      firstName: 'Sreekanth',
      lastName: 'Enduru',
      emailId: 'smlogics25@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12433',
      firstName: 'Sreekanth',
      lastName: 'Enduru',
      emailId: 'smlogics25@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12433',
      firstName: 'Sreekanth',
      lastName: 'Enduru',
      emailId: 'smlogics25@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12433',
      firstName: 'Sreekanth',
      lastName: 'Enduru',
      emailId: 'smlogics25@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12433',
      firstName: 'Sreekanth',
      lastName: 'Enduru',
      emailId: 'smlogics25@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12433',
      firstName: 'Sreekanth',
      lastName: 'Enduru',
      emailId: 'smlogics25@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12433',
      firstName: 'Sreekanth',
      lastName: 'Enduru',
      emailId: 'smlogics25@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12433',
      firstName: 'Sreekanth',
      lastName: 'Enduru',
      emailId: 'smlogics25@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12433',
      firstName: 'Sreekanth',
      lastName: 'Enduru',
      emailId: 'smlogics25@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12434',
      firstName: 'SRICHANDANA',
      lastName: 'GOTTIPATI',
      emailId: 'smlogics1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12434',
      firstName: 'SRICHANDANA',
      lastName: 'GOTTIPATI',
      emailId: 'smlogics1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12434',
      firstName: 'SRICHANDANA',
      lastName: 'GOTTIPATI',
      emailId: 'smlogics1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12434',
      firstName: 'SRICHANDANA',
      lastName: 'GOTTIPATI',
      emailId: 'smlogics1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12434',
      firstName: 'SRICHANDANA',
      lastName: 'GOTTIPATI',
      emailId: 'smlogics1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12434',
      firstName: 'SRICHANDANA',
      lastName: 'GOTTIPATI',
      emailId: 'smlogics1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S12434',
      firstName: 'SRICHANDANA',
      lastName: 'GOTTIPATI',
      emailId: 'smlogics1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12427',
      firstName: 'Sujeet',
      lastName: 'Deshpande',
      emailId: 'smlogics10@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12427',
      firstName: 'Sujeet',
      lastName: 'Deshpande',
      emailId: 'smlogics10@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12427',
      firstName: 'Sujeet',
      lastName: 'Deshpande',
      emailId: 'smlogics10@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12427',
      firstName: 'Sujeet',
      lastName: 'Deshpande',
      emailId: 'smlogics10@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12427',
      firstName: 'Sujeet',
      lastName: 'Deshpande',
      emailId: 'smlogics10@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12427',
      firstName: 'Sujeet',
      lastName: 'Deshpande',
      emailId: 'smlogics10@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12427',
      firstName: 'Sujeet',
      lastName: 'Deshpande',
      emailId: 'smlogics10@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12427',
      firstName: 'Sujeet',
      lastName: 'Deshpande',
      emailId: 'smlogics10@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12427',
      firstName: 'Sujeet',
      lastName: 'Deshpande',
      emailId: 'smlogics10@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12428',
      firstName: 'Rahel',
      lastName: 'Baja',
      emailId: 'smlogics35@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12428',
      firstName: 'Rahel',
      lastName: 'Baja',
      emailId: 'smlogics35@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12428',
      firstName: 'Rahel',
      lastName: 'Baja',
      emailId: 'smlogics35@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12428',
      firstName: 'Rahel',
      lastName: 'Baja',
      emailId: 'smlogics35@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12428',
      firstName: 'Rahel',
      lastName: 'Baja',
      emailId: 'smlogics35@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12428',
      firstName: 'Rahel',
      lastName: 'Baja',
      emailId: 'smlogics35@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S12428',
      firstName: 'Rahel',
      lastName: 'Baja',
      emailId: 'smlogics35@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12429',
      firstName: 'ABHILASH',
      lastName: 'BANDA',
      emailId: 'smlogics29@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12429',
      firstName: 'ABHILASH',
      lastName: 'BANDA',
      emailId: 'smlogics29@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12430',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics28@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12430',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics28@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12430',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics28@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12430',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics28@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12430',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics28@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12430',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics28@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '7',
      name: 'Jury Duty Leave',
      situational: '0',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S12430',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics28@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '7',
      name: 'Jury Duty Leave',
      situational: '0',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S12430',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics28@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '7',
      name: 'Jury Duty Leave',
      situational: '0',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S12430',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics28@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S12430',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics28@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S12430',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics28@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S12430',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics28@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S12431',
      firstName: 'Rohitha',
      lastName: 'Dasari',
      emailId: 'smlogics27@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12431',
      firstName: 'Rohitha',
      lastName: 'Dasari',
      emailId: 'smlogics27@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12431',
      firstName: 'Rohitha',
      lastName: 'Dasari',
      emailId: 'smlogics27@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12431',
      firstName: 'Rohitha',
      lastName: 'Dasari',
      emailId: 'smlogics27@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12431',
      firstName: 'Rohitha',
      lastName: 'Dasari',
      emailId: 'smlogics27@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S12431',
      firstName: 'Rohitha',
      lastName: 'Dasari',
      emailId: 'smlogics27@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '3',
      name: 'marriage leave',
      situational: '0',
      country: {
        id: '30',
        name: 'Brazil'
      }
    }
  },
  {
    user: {
      userId: 'S12432',
      firstName: 'Curtis',
      lastName: 'Davis',
      emailId: 'smlogics26@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12432',
      firstName: 'Curtis',
      lastName: 'Davis',
      emailId: 'smlogics26@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12432',
      firstName: 'Curtis',
      lastName: 'Davis',
      emailId: 'smlogics26@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12432',
      firstName: 'Curtis',
      lastName: 'Davis',
      emailId: 'smlogics26@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12434',
      firstName: 'SRICHANDANA',
      lastName: 'GOTTIPATI',
      emailId: 'smlogics1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12434',
      firstName: 'SRICHANDANA',
      lastName: 'GOTTIPATI',
      emailId: 'smlogics1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '7',
      name: 'Jury Duty Leave',
      situational: '0',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S12434',
      firstName: 'SRICHANDANA',
      lastName: 'GOTTIPATI',
      emailId: 'smlogics1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '7',
      name: 'Jury Duty Leave',
      situational: '0',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S12434',
      firstName: 'SRICHANDANA',
      lastName: 'GOTTIPATI',
      emailId: 'smlogics1@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '8',
      name: 'prevalized leave',
      situational: '0',
      country: {
        id: '7',
        name: 'Anguilla'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12435',
      firstName: 'Kishore',
      lastName: 'Govini',
      emailId: 'smlogics2@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12437',
      firstName: 'Sujeet',
      lastName: 'Deshpande',
      emailId: 'smlogics11@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12437',
      firstName: 'Sujeet',
      lastName: 'Deshpande',
      emailId: 'smlogics11@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12437',
      firstName: 'Sujeet',
      lastName: 'Deshpande',
      emailId: 'smlogics11@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12437',
      firstName: 'Sujeet',
      lastName: 'Deshpande',
      emailId: 'smlogics11@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12437',
      firstName: 'Sujeet',
      lastName: 'Deshpande',
      emailId: 'smlogics11@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12437',
      firstName: 'Sujeet',
      lastName: 'Deshpande',
      emailId: 'smlogics11@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12437',
      firstName: 'Sujeet',
      lastName: 'Deshpande',
      emailId: 'smlogics11@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12437',
      firstName: 'Sujeet',
      lastName: 'Deshpande',
      emailId: 'smlogics11@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12437',
      firstName: 'Sujeet',
      lastName: 'Deshpande',
      emailId: 'smlogics11@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12438',
      firstName: 'Rahel',
      lastName: 'Baja',
      emailId: 'smlogics36@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12438',
      firstName: 'Rahel',
      lastName: 'Baja',
      emailId: 'smlogics36@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12438',
      firstName: 'Rahel',
      lastName: 'Baja',
      emailId: 'smlogics36@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12438',
      firstName: 'Rahel',
      lastName: 'Baja',
      emailId: 'smlogics36@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12438',
      firstName: 'Rahel',
      lastName: 'Baja',
      emailId: 'smlogics36@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12438',
      firstName: 'Rahel',
      lastName: 'Baja',
      emailId: 'smlogics36@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S12438',
      firstName: 'Rahel',
      lastName: 'Baja',
      emailId: 'smlogics36@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12439',
      firstName: 'ABHILASH',
      lastName: 'BANDA',
      emailId: 'smlogics24@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12439',
      firstName: 'ABHILASH',
      lastName: 'BANDA',
      emailId: 'smlogics24@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12440',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics23@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12440',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics23@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12440',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics23@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12440',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics23@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12440',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics23@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12440',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics23@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '7',
      name: 'Jury Duty Leave',
      situational: '0',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S12440',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics23@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '7',
      name: 'Jury Duty Leave',
      situational: '0',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S12440',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics23@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '7',
      name: 'Jury Duty Leave',
      situational: '0',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S12440',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics23@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S12440',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics23@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S12440',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics23@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S12440',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics23@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S12441',
      firstName: 'Rohitha',
      lastName: 'Dasari',
      emailId: 'smlogics42@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12441',
      firstName: 'Rohitha',
      lastName: 'Dasari',
      emailId: 'smlogics42@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12441',
      firstName: 'Rohitha',
      lastName: 'Dasari',
      emailId: 'smlogics42@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12441',
      firstName: 'Rohitha',
      lastName: 'Dasari',
      emailId: 'smlogics42@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12441',
      firstName: 'Rohitha',
      lastName: 'Dasari',
      emailId: 'smlogics42@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S12441',
      firstName: 'Rohitha',
      lastName: 'Dasari',
      emailId: 'smlogics42@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '3',
      name: 'marriage leave',
      situational: '0',
      country: {
        id: '30',
        name: 'Brazil'
      }
    }
  },
  {
    user: {
      userId: 'S12442',
      firstName: 'Curtis',
      lastName: 'Davis',
      emailId: 'smlogics46@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12442',
      firstName: 'Curtis',
      lastName: 'Davis',
      emailId: 'smlogics46@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12442',
      firstName: 'Curtis',
      lastName: 'Davis',
      emailId: 'smlogics46@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S12442',
      firstName: 'Curtis',
      lastName: 'Davis',
      emailId: 'smlogics46@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11291',
      firstName: 'Naidu',
      lastName: 'N',
      emailId: 'smlogics18@gmail.com',
      phoneNo: '+764-9876345656'
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11291',
      firstName: 'Naidu',
      lastName: 'N',
      emailId: 'smlogics18@gmail.com',
      phoneNo: '+764-9876345656'
    },
    role_name: '',
    leave_type: {
      id: '7',
      name: 'Jury Duty Leave',
      situational: '0',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S11291',
      firstName: 'Naidu',
      lastName: 'N',
      emailId: 'smlogics18@gmail.com',
      phoneNo: '+764-9876345656'
    },
    role_name: '',
    leave_type: {
      id: '7',
      name: 'Jury Duty Leave',
      situational: '0',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S11291',
      firstName: 'Naidu',
      lastName: 'N',
      emailId: 'smlogics18@gmail.com',
      phoneNo: '+764-9876345656'
    },
    role_name: '',
    leave_type: {
      id: '8',
      name: 'prevalized leave',
      situational: '0',
      country: {
        id: '7',
        name: 'Anguilla'
      }
    }
  },
  {
    user: {
      userId: 'S11292',
      firstName: 'BHARAT',
      lastName: 'SING',
      emailId: 'smlogics19@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11292',
      firstName: 'BHARAT',
      lastName: 'SING',
      emailId: 'smlogics19@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11292',
      firstName: 'BHARAT',
      lastName: 'SING',
      emailId: 'smlogics19@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11292',
      firstName: 'BHARAT',
      lastName: 'SING',
      emailId: 'smlogics19@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11292',
      firstName: 'BHARAT',
      lastName: 'SING',
      emailId: 'smlogics19@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11292',
      firstName: 'BHARAT',
      lastName: 'SING',
      emailId: 'smlogics19@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S11292',
      firstName: 'BHARAT',
      lastName: 'SING',
      emailId: 'smlogics19@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11295',
      firstName: 'tom',
      lastName: 'peters',
      emailId: 'smlogics60@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11295',
      firstName: 'tom',
      lastName: 'peters',
      emailId: 'smlogics60@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11295',
      firstName: 'tom',
      lastName: 'peters',
      emailId: 'smlogics60@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11295',
      firstName: 'tom',
      lastName: 'peters',
      emailId: 'smlogics60@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11295',
      firstName: 'tom',
      lastName: 'peters',
      emailId: 'smlogics60@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11295',
      firstName: 'tom',
      lastName: 'peters',
      emailId: 'smlogics60@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S11295',
      firstName: 'tom',
      lastName: 'peters',
      emailId: 'smlogics60@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11298',
      firstName: 'Test',
      lastName: 'Test',
      emailId: 'bff8106128841@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11298',
      firstName: 'Test',
      lastName: 'Test',
      emailId: 'bff8106128841@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11298',
      firstName: 'Test',
      lastName: 'Test',
      emailId: 'bff8106128841@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11298',
      firstName: 'Test',
      lastName: 'Test',
      emailId: 'bff8106128841@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11298',
      firstName: 'Test',
      lastName: 'Test',
      emailId: 'bff8106128841@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S11298',
      firstName: 'Test',
      lastName: 'Test',
      emailId: 'bff8106128841@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '3',
      name: 'marriage leave',
      situational: '0',
      country: {
        id: '30',
        name: 'Brazil'
      }
    }
  },
  {
    user: {
      userId: 'S11299',
      firstName: 'Test',
      lastName: 'Test',
      emailId: 'ravibasolutions@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11299',
      firstName: 'Test',
      lastName: 'Test',
      emailId: 'ravibasolutions@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11299',
      firstName: 'Test',
      lastName: 'Test',
      emailId: 'ravibasolutions@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11299',
      firstName: 'Test',
      lastName: 'Test',
      emailId: 'ravibasolutions@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11299',
      firstName: 'Test',
      lastName: 'Test',
      emailId: 'ravibasolutions@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '6',
      name: 'Child Care Leave',
      situational: '1',
      country: {
        id: '231',
        name: 'United States'
      }
    }
  },
  {
    user: {
      userId: 'S11299',
      firstName: 'Test',
      lastName: 'Test',
      emailId: 'ravibasolutions@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '3',
      name: 'marriage leave',
      situational: '0',
      country: {
        id: '30',
        name: 'Brazil'
      }
    }
  },
  {
    user: {
      userId: 'S12430',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics28@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '4',
      name: 'maternity leaves',
      situational: '0',
      country: {
        id: '72',
        name: 'Faroe Islands'
      }
    }
  },
  {
    user: {
      userId: 'S12440',
      firstName: 'Venkateswara',
      lastName: 'Bollineni',
      emailId: 'smlogics23@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '4',
      name: 'maternity leaves',
      situational: '0',
      country: {
        id: '72',
        name: 'Faroe Islands'
      }
    }
  },
  {
    user: {
      userId: 'SMU1019',
      firstName: 'Peter',
      lastName: 'Ethan',
      emailId: 'basolutionsa@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '2',
      name: 'Sick Leave',
      situational: '0',
      country: {
        id: '2',
        name: 'Albania'
      }
    }
  },
  {
    user: {
      userId: 'v9681',
      firstName: 'nikki',
      lastName: 'jones',
      emailId: 'nikki@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '2',
      name: 'Sick Leave',
      situational: '0',
      country: {
        id: '2',
        name: 'Albania'
      }
    }
  },
  {
    user: {
      userId: 'gst1290',
      firstName: 'Rohit',
      lastName: 'Kanuri',
      emailId: 'smlogics3+1@gmail.com',
      phoneNo: '2345678901'
    },
    role_name: '',
    leave_type: {
      id: '2',
      name: 'Sick Leave',
      situational: '0',
      country: {
        id: '2',
        name: 'Albania'
      }
    }
  },
  {
    user: {
      userId: 'S12428',
      firstName: 'Rahel',
      lastName: 'Baja',
      emailId: 'smlogics35@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '2',
      name: 'Sick Leave',
      situational: '0',
      country: {
        id: '2',
        name: 'Albania'
      }
    }
  },
  {
    user: {
      userId: 'S12438',
      firstName: 'Rahel',
      lastName: 'Baja',
      emailId: 'smlogics36@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '2',
      name: 'Sick Leave',
      situational: '0',
      country: {
        id: '2',
        name: 'Albania'
      }
    }
  },
  {
    user: {
      userId: 'S11292',
      firstName: 'BHARAT',
      lastName: 'SING',
      emailId: 'smlogics19@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '2',
      name: 'Sick Leave',
      situational: '0',
      country: {
        id: '2',
        name: 'Albania'
      }
    }
  },
  {
    user: {
      userId: 'S11295',
      firstName: 'tom',
      lastName: 'peters',
      emailId: 'smlogics60@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '2',
      name: 'Sick Leave',
      situational: '0',
      country: {
        id: '2',
        name: 'Albania'
      }
    }
  },
  {
    user: {
      userId: 'SMU1005',
      firstName: 'gorge',
      lastName: 'relex',
      emailId: 'jorge@gmail.com',
      phoneNo: ''
    },
    role_name: '',
    leave_type: {
      id: '2',
      name: 'Sick Leave',
      situational: '0',
      country: {
        id: '2',
        name: 'Albania'
      }
    }
  },
  {
    user: {
      userId: 'SMU1004',
      firstName: 'Mike',
      lastName: 'Jones',
      emailId: 'pavankumargarimella91@gmail.com',
      phoneNo: '8765345672'
    },
    role_name: '',
    leave_type: {
      id: '2',
      name: 'Sick Leave',
      situational: '0',
      country: {
        id: '2',
        name: 'Albania'
      }
    }
  },
  {
    user: {
      userId: 'S11309',
      firstName: 'Marry',
      lastName: 'Carlos',
      emailId: 'smlogics34@gmail.com',
      phoneNo: '2356894521'
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11309',
      firstName: 'Marry',
      lastName: 'Carlos',
      emailId: 'smlogics34@gmail.com',
      phoneNo: '2356894521'
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11309',
      firstName: 'Marry',
      lastName: 'Carlos',
      emailId: 'smlogics34@gmail.com',
      phoneNo: '2356894521'
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  },
  {
    user: {
      userId: 'S11309',
      firstName: 'Marry',
      lastName: 'Carlos',
      emailId: 'smlogics34@gmail.com',
      phoneNo: '2356894521'
    },
    role_name: '',
    leave_type: {
      id: '1',
      name: 'sandal leave',
      situational: '0',
      country: {
        id: '31',
        name: 'British Indian Ocean Territory'
      }
    }
  }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyLeaveComponent],
      providers: [
        { provide: UserService, useValue: userService }
      ],
      imports: [
        FormsModule,
        HttpModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        FileUploadModule,
        NgMultiSelectDropDownModule.forRoot(),
        ArchwizardModule,
        CustomFormsModule,
        OwlDateTimeModule, OwlNativeDateTimeModule,
        RouterTestingModule, DataTableModule

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyLeaveComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    localStorage.setItem('currentUser', JSON.stringify({
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTY0NjM0NTUxLCJleHAiOjE1NjQ2NTI1NTF9.gNsDldeY4OeFA91fBmE0n4CXOSEeJ_GbjS5fgr6twB4',
      email: 'pavan.basolutions@gmail.com',
      id: '1',
      flag: null,
      empType: {
        id: '5',
        employeeType: 'Employee'
      },
      userType: {
        id: '3',
        name: 'employee',
        typeName: 'Employee'
      },
      first_name: 'Davidsvids',
      last_name: 'jackson',
      middle_name: 'james',
      isAdmin: true,
      Adminrole: true,
      permission: {
        createWorkShifts: true,
        createAssignLeave: false,
        createCandidates: true,
        createCompanyInfo: true,
        createCustomers: false,
        createEducation: true,
        createEmployeestatus: true,
        createHolidays: true,
        createJobCategorie: true,
        createJobTitle: true,
        createLanguages: true,
        createLicenses: true,
        createMemberships: true,
        createPayGrade: true,
        createProjects: true,
        createSkills: true,
        createTerminationReasons: true,
        createTimesheets: true,
        createUser: true,
        createRole: true,
        updateWorkShifts: true,
        updateCandidates: true,
        updateCustomers: false,
        updateEducation: true,
        updateEmployeestatus: true,
        updateHolidays: true,
        updateJobCategorie: true,
        updateJobTitle: true,
        updateLanguages: true,
        updateLicenses: true,
        updateMemberships: true,
        createActivity: false,
        updateActivity: false,
        updatePayGrade: true,
        updateProjects: true,
        updateSkills: true,
        activities: false,
        getActivity: false,
        updateTerminationReasons: true,
        updateTimesheets: true,
        updateUser: true,
        updateRole: true,
        readWorkShifts: true,
        readAssignLeave: false,
        readCandidates: true,
        readCustomers: false,
        readEducation: true,
        readEmployeestatus: true,
        readEmployeeTimesheets: true,
        readHolidays: true,
        readJobTitle: true,
        readLanguages: true,
        readLicenses: true,
        readMemberships: true,
        readPayGrade: true,
        readProjects: true,
        readSkills: true,
        readTerminationReasons: true,
        readUser: true,
        readConfiguration: true,
        createPermission: false,
        readPermission: false,
        updatePermission: true,
        updatePrefix: true,
        createBranch: true,
        updateBranch: true,
        readSettings: true,
        createJob: true,
        updateJob: true,
        readJob: true,
        readRole: true,
        updateClientCompany: true,
        createClientCompany: true,
        readClientCompany: true,
        readVendorCompany: true,
        readClientContacts: true,
        updateClientContacts: true,
        createClientContacts: true,
        readVendorContacts: true,
        readTimesheets: true,
        viewTimesheet: true,
        readJobDetails: true,
        updateJobDetails: true,
        readSalaryComponent: true,
        createSalaryComponent: true,
        updateSalaryComponent: true,
        readKpi: true,
        createKpi: true,
        updateKpi: true,
        readTracker: true,
        createTracker: true,
        updateTracker: true,
        readReview: true,
        createReview: true,
        updateReview: true,
        createEmployeeType: true,
        createLeave: true,
        updateLeave: true,
        readLeave: true,
        readOrganizationalKpi: true,
        updateOrganizationalKpi: true,
        readTermsConditions: true,
        updateTermsConditions: true,
        createTermsConditions: true,
        createUserApplyLeave: true,
        updateUserApplyLeave: true,
        addEntitlements: true,
        readEntitlements: true,
        updateEmployeeType: true,
        readEmployeeType: true,
        updateVendorCompany: true,
        createVendorCompany: true,
        createVendorContacts: true,
        updateVendorContacts: true,
        readJobCategorie: true,
        readEmployeeReviews: true,
        readSupervisorReviews: true,
        createOrganizationalKpi: false,
        readUserReports: true
      },
      submenuPermission: {
        clientCompany: true,
        vendorCompany: true,
        clientCompanyContact: true,
        vendorCompanyContact: true,
        jobPosting: true,
        candidates: true,
        projects: true,
        assignProjects: true,
        myTimesheets: true,
        employeeTimesheet: true,
        kPIs: true,
        manageReviews: true,
        myReviews: true,
        employeeReviews: true,
        leavePeriod: true,
        leaveType: true,
        entitlements: true,
        reports: true,
        leaveList: true,
        assignLeave: true,
        applyLeave: true,
        myEntitlements: true
      },
      fieldPermission: {
        readdob: true,
        updatedob: true,
        createdob: true,
        readssn: true,
        createssn: true,
        updatessn: true,
        readInternalNotes: true,
        createInternalNotes: true,
        updateInternalNotes: true,
        readJobInternalNotes: true,
        createJobInternalNotes: true,
        updateJobInternalNotes: true
      }
    }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#dateValidate', fakeAsync(() => {
    // Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time)
    // Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)
    // Sun Sep 22 2019 00:00:00 GMT+0530 (India Standard Time)
    component.balanceDays = 10;
    component.applyData.from_date = new Date('Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)');
    component.applyData.to_date = new Date('Sun Sep 22 2019 00:00:00 GMT+0530 (India Standard Time)');
    component.dateValidate();
    tick();
    expect(component.dateError).toEqual('Please select the valid from date');

    component.applyData.to_date = new Date('Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)');
    component.applyData.from_date = new Date('Sun Sep 22 2019 00:00:00 GMT+0530 (India Standard Time)');
    component.dateValidate();
    tick();
    expect(component.dateError).toEqual('');
    expect(component.limitError).toEqual('');

    component.balanceDays = 0;

    component.applyData.to_date = new Date('Mon Sep 23 2019 00:00:00 GMT+0530 (India Standard Time)');
    component.applyData.from_date = new Date('Sun Sep 22 2019 00:00:00 GMT+0530 (India Standard Time)');
    component.dateValidate();
    tick();
    expect(component.dateError).toEqual('');
    expect(component.limitError).toEqual('Leave balance exceded please contact you manager');
  }));

  it('#onchange1', fakeAsync(() => {
    component.onchange1('');
    tick();
    expect(component.showform1).toBe(false);

    component.onchange1('1');
    tick();
    expect(component.showform1).toBe(true);
  }));

  it('#ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.filterData).toEqual(leaveData);
  }));


  it('#applyLeave', fakeAsync(() => {
    const myFrm: NgForm = new NgForm([], []);
    component.applyLeave(myFrm);
    tick();
    expect(component.message).toEqual(undefined);
  }));

  it('#closePopup', fakeAsync(() => {
    component.isShowPopup = true;
    component.closePopup();
    tick();
    expect(component.isShowPopup).toBe(false);
    expect(component.isShowDetails).toBe(false);
  }));

  it('#closePopup1', fakeAsync(() => {
    component.isShowPopup1 = true;
    component.closePopup();
    tick();
    expect(component.isShowPopup1).toBe(true);
    expect(component.isShowDetails1).toBe(false);
  }));

  it('#closePopup2', fakeAsync(() => {
    component.isShowPopup2 = true;
    component.closePopup();
    tick();
    expect(component.isShowPopup2).toBe(true);
    expect(component.error).toEqual(null);
    expect(component.message).toEqual(undefined);
  }));

  it('#balanceDetails', fakeAsync(() => {
    component.balanceDetails();
    tick();
    expect(component.isShowPopup1).toBe(true);
    expect(component.isShowDetails1).toBe(true);
  }));

  it('#showdetails', fakeAsync(() => {
    component.showdetails();
    tick();
    expect(component.isShowPopup).toBe(true);
    expect(component.isShowDetails).toBe(true);
  }));

  it('#onchange', fakeAsync(() => {
    component.onchange('1', '1');
    tick();
    expect(component.assignData.start_day).toEqual('');
    expect(component.assignData.start_day_shift).toEqual(undefined);
    expect(component.assignData.end_day).toEqual(undefined);
    expect(component.assignData.end_day_shift).toEqual(undefined);

    component.onchange('1', null);
    tick();
    expect(component.none).toBe(false);
    expect(component.allDays).toBe(false);
    expect(component.startDay).toBe(false);
    expect(component.endDay).toBe(false);
    expect(component.startEndDay).toBe(false);
    expect(component.halfDay).toBe(false);

    component.onchange('2', null);
    tick();
    expect(component.none).toBe(false);
    expect(component.allDays).toBe(true);
    expect(component.startDay).toBe(false);
    expect(component.endDay).toBe(false);
    expect(component.startEndDay).toBe(false);
    expect(component.halfDay).toBe(false);
    expect(component.halfDay1).toBe(false);

    component.onchange('3', null);
    tick();
    expect(component.none).toBe(false);
    expect(component.allDays).toBe(false);
    expect(component.startDay).toBe(true);
    expect(component.endDay).toBe(false);
    expect(component.startEndDay).toBe(false);
    expect(component.halfDay).toBe(false);
    expect(component.halfDay2).toBe(false);

    component.onchange('4', null);
    tick();
    expect(component.none).toBe(false);
    expect(component.allDays).toBe(false);
    expect(component.startDay).toBe(false);
    expect(component.endDay).toBe(true);
    expect(component.startEndDay).toBe(false);
    expect(component.halfDay).toBe(false);

    component.onchange('5', null);
    tick();
    expect(component.none).toBe(false);
    expect(component.allDays).toBe(false);
    expect(component.startDay).toBe(false);
    expect(component.endDay).toBe(false);
    expect(component.startEndDay).toBe(true);
    expect(component.halfDay).toBe(false);
  }));

  it('#getBalance', fakeAsync(() => {
    component.getBalance('1');
    tick();
    expect(component.balanceDays).toEqual(2);
  }));

  it('#onchange2', fakeAsync(() => {
    component.onchange2('1');
    tick();
    expect(component.halfDay1).toBe(false);

    component.onchange2('2');
    tick();
    expect(component.halfDay1).toBe(true);
  }));

  it('#onchange3', fakeAsync(() => {
    component.onchange3('1');
    tick();
    expect(component.halfDay2).toBe(false);

    component.onchange3('2');
    tick();
    expect(component.halfDay2).toBe(true);
  }));

  it('#onchange4', fakeAsync(() => {
    component.onchange4('1');
    tick();
    expect(component.halfDay3).toBe(false);

    component.onchange4('2');
    tick();
    expect(component.halfDay3).toBe(true);
  }));

  it('#onchange5', fakeAsync(() => {
    component.onchange5('1');
    tick();
    expect(component.halfDay4).toBe(false);

    component.onchange5('2');
    tick();
    expect(component.halfDay4).toBe(true);
  }));

  it('#endDayChange', fakeAsync(() => {
    component.endDayChange('1');
    tick();
    expect(component.halfdays5).toBe(false);

    component.endDayChange('2');
    tick();
    expect(component.halfdays5).toBe(true);
  }));
});
