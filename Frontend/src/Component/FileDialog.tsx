import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FileProp {
  open: boolean;
  setOpen: Function;
}

const FileDialog: React.FC<FileProp> = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        sx={{ backgroundColor: "primary" }}
        color="primary"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Imagine that this a File"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit
            id dignissimos quas quia aliquam dolorem numquam eos minima debitis
            enim ipsa sapiente odit impedit velit, rem commodi iste architecto
            aliquid. Aliquam modi eius similique ea ducimus temporibus omnis
            eveniet culpa labore ipsum doloribus beatae sed eum fuga sunt, rerum
            sapiente, iure delectus molestiae. Nesciunt qui doloribus voluptas
            quod, quos beatae. Ex doloribus quidem repellat dolorum esse? Odio
            asperiores error, illum accusantium ullam, beatae consequatur magni
            quisquam nostrum amet consequuntur cum cumque? Voluptatum dicta
            ratione quis veniam natus mollitia non dignissimos! Consequuntur
            illo, perspiciatis minus esse dolores ab odit error possimus
            doloribus magnam qui quis natus assumenda fugiat, doloremque eveniet
            ipsam similique fugit quaerat ducimus. Pariatur perferendis ratione
            labore sapiente iusto? Reiciendis consectetur error saepe placeat
            impedit perspiciatis quae aliquam, cumque ullam aliquid totam modi
            officiis quasi in voluptas nisi tempora ea dicta architecto cum
            alias. Rem magni tempore mollitia enim. Quos iste nisi, deserunt
            aperiam fuga nemo rem enim nobis facere dolore facilis aspernatur
            consequuntur eligendi reiciendis sapiente, odio distinctio
            voluptatibus itaque eveniet sed beatae ab nihil, aliquid magnam.
            Incidunt? Eligendi tenetur voluptatem cumque sunt cum repudiandae,
            sed aspernatur voluptatibus error dolorem laborum, nemo recusandae
            sit at, placeat nesciunt ullam repellendus repellat. Eveniet non
            consequuntur odio obcaecati esse, porro autem. Earum, veniam, nam
            ipsa voluptatum tempora velit amet modi quaerat fugit beatae ex
            rerum. Officiis repellendus harum provident maxime vel, quae id quos
            ipsum vero quaerat omnis et excepturi similique? Laudantium vel
            perspiciatis quasi a illum repellendus facere, velit eos non
            inventore, magni facilis fugiat voluptas odio tenetur laboriosam
            expedita dolores tempora quaerat. Blanditiis ab voluptatum minima
            molestias libero. Quisquam. Sequi architecto accusamus incidunt
            aliquid sapiente non? Omnis ratione ipsum autem facere doloremque
            aliquid porro consequatur vel eius qui in, ab architecto atque
            deserunt sit cumque voluptatum odio adipisci eveniet. Eum
            consequuntur, rem itaque aliquam dolor rerum iusto aut accusamus et
            eos veritatis vel quaerat iure optio architecto deleniti tenetur.
            Asperiores, qui corporis porro vero atque nesciunt excepturi
            repellendus. Nihil. Dolorum eligendi iste dicta repellat dolores
            laudantium. Repudiandae aspernatur voluptates in dolores. Sunt
            accusantium blanditiis eum tempora a, alias voluptates. Dicta ipsum
            obcaecati, nam harum vero ea odio corporis. Fugit! Nihil laboriosam,
            fugiat minus possimus quibusdam suscipit. Sed voluptas, ab ad
            debitis voluptatem soluta iure odit saepe. Nam laudantium cum, eum
            ut iure voluptatibus vero ducimus debitis aliquam? Ab, neque?
            Consequuntur expedita reprehenderit rem, distinctio fugit minus unde
            velit sit explicabo ullam fugiat incidunt nam tenetur in iusto
            suscipit saepe voluptatibus similique maiores corporis soluta. Nemo,
            unde fugiat. Voluptatum, optio. Quidem alias corporis repellat ipsa
            quam nisi dolorum incidunt repudiandae quas possimus. Cumque, illum,
            quis non illo earum incidunt veniam laborum consequuntur voluptas
            beatae sint a tempora eos quibusdam iste? Corporis voluptatibus
            laborum voluptate, repellendus officia error veniam nemo neque est
            iure perferendis voluptates illum sapiente ex quae! Illo laborum
            culpa, officiis obcaecati accusamus ea neque doloremque incidunt
            praesentium dolorem. Dolore error voluptas repellat nesciunt ipsum
            possimus aspernatur exercitationem beatae perspiciatis, sunt
            asperiores voluptatum assumenda! Nostrum, odit dolores molestias
            exercitationem expedita hic earum eum atque modi obcaecati magnam
            sint velit. Dicta explicabo repellat veritatis numquam! Tempora eos
            in dolor saepe numquam ipsa possimus vitae, qui, rerum ratione
            eveniet! Numquam, aliquam assumenda. Nihil magnam veritatis
            repudiandae quam! Eum consequatur laudantium repellat! Laboriosam,
            modi. Assumenda alias obcaecati illo magni corrupti porro itaque,
            voluptatibus labore, laboriosam incidunt iste at ratione velit.
            Perspiciatis blanditiis pariatur error porro libero earum tempora
            est, velit perferendis rem. Aliquid fugiat deserunt amet repudiandae
            dignissimos eum, molestiae nobis quae, tempore possimus est
            consequuntur quis, tenetur iusto sapiente reprehenderit voluptates
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default FileDialog;
