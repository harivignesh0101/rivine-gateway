import {Button} from "@components/ui/button";
import {Separator} from "@components/ui/separator";
import {OrganizationSwitcherComponent} from "@components/custom/organization-switcher";
import {ProjectSwitcher} from "@components/custom/project-switcher";
import React from "react";
import Image from "@node_modules/next/image";
import {ModeToggle} from "@components/ui/mode-toggle";
import {UserButtonComponent} from "@components/custom/user-button-component";


export function HeaderPanel() {
    return (
        <header className="fle sticky top-0 z-50 w-full items-center border-b bg-background">
            <div className="flex justify-between">
                <div className="flex h-[--header-height] w-full items-center gap-2 px-4">
                    <div className="flex items-center space-x-">
                        <Image
                            className="dark:invert"
                            src="/logo.svg"
                            alt="Next.js logo"
                            width={40}
                            height={40}
                            priority
                        />
                    </div>
                    <Separator orientation="vertical" className="mr-2 h-4"/>
                    <div className="flex items-center justify-between">
                        <div className="flex justify-start items-center">
                            <span>
                                <OrganizationSwitcherComponent/>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex row justify-center items-center">
                    <div className="m-2">
                        <ModeToggle></ModeToggle>
                    </div>
                    <Separator orientation="vertical" className="ml-2 h-4"/>
                    <div className="m-4 flex justify-center items-center">
                        <UserButtonComponent></UserButtonComponent>
                    </div>
                </div>
            </div>
        </header>
    )
}
