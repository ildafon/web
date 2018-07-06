import {
    Component,
    OnInit,
} from '@angular/core';

import { MessagingService } from 'jslib/abstractions/messaging.service';
import { PlatformUtilsService } from 'jslib/abstractions/platformUtils.service';
import { TokenService } from 'jslib/abstractions/token.service';

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnInit {
    selfHosted = false;
    name: string;

    constructor(private messagingService: MessagingService, private platformUtilsService: PlatformUtilsService,
        private tokenService: TokenService) {
        this.selfHosted = this.platformUtilsService.isSelfHost();
    }

    async ngOnInit() {
        this.name = await this.tokenService.getName();
        if (this.name == null || this.name.trim() === '') {
            this.name = await this.tokenService.getEmail();
        }
    }

    lock() {
        this.messagingService.send('lockVault');
    }

    logOut() {
        this.messagingService.send('logout');
    }
}
