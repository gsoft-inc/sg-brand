import {
    AddIcon,
    ArrowFullIcon,
    ArrowOutlineIcon,
    CancelIcon,
    CheckmarkIcon,
    ChevronIcon,
    InfoIcon,
    MagnifierIcon
} from "@orbit-ui/icons";
import { storiesBuilder } from "@utils/stories-builder";

function stories() {
    return storiesBuilder(module, "Materials|icons")
        .chromaticDelay(100)
        .build();
}

stories()
    .add("default",
         () =>
             <div className="flex flex-column items-center">
                 <div className="mb4 flex">
                     <ChevronIcon className="h3 w3" />
                 </div>
                 <div className="mb4 flex">
                     <ArrowFullIcon className="w2 h2" />
                 </div>
                 <div className="mb4 flex">
                     <ArrowOutlineIcon className="w4 h4" />
                 </div>
                 <div className="mb4 flex">
                     <CancelIcon className="h3 w3" />
                 </div>
                 <div className="mb4 flex">
                     <AddIcon className="w4 h4" />
                 </div>
                 <div className="mb4 flex">
                     <MagnifierIcon className="w4 h4" />
                 </div>
                 <div className="mb4 flex">
                     <InfoIcon className="w4 h4" />
                 </div>
                 <div className="mb4 flex">
                     <CheckmarkIcon className="w4 h4" />
                 </div>
             </div>
    );
