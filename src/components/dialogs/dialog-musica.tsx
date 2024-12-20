"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Musica } from "../apiObjects";
import { useState } from "react";
import { Button } from "../ui/button";
import { Check, Music } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CreateMusica } from "../apiRequests";
import { toast, useToast } from "../ui/use-toast";
import { title } from "process";

export function DialogAddMusica() {
    const [nomeMusica, setNomeMusica] = useState("");
    const [linkMusica, setLinkMusica] = useState("");
    const [cifraMusica, setCifraMusica] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="flex p-5">
                <Button variant={"outfill"} className="mx-2 font-bold" onClick={() => setLoading(false)}>
                    <Music className="mr-2" />Adicionar Música</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Música</DialogTitle>
                    <br />
                    <Label>Nome:</Label>
                    <Input type="text" placeholder="Insira o nome da música."
                        value={nomeMusica} onChange={(e) => setNomeMusica(e.target.value)} />
                    <br />
                    <Label>Link:</Label>
                    <Input type="url" placeholder="Insira o link da música."
                        value={linkMusica} onChange={(e) => setLinkMusica(e.target.value)} />
                    <br />
                    {/* <Label>Cifra:</Label>
                    <Input type="text" placeholder="Insira um contato do Levita." 
                        value ={cifraMusica} onChange={(e) => setCifraMusica(e.target.value)}/> */}

                </DialogHeader>
                <DialogFooter className="">
                    <Button className="hover:bg-emerald-500"
                        type="submit"  disabled={isLoading} onClick={() => {
                            setLoading(true)
                            fetch("http://localhost:1004/v1/musicas", {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    nome: nomeMusica,
                                    link: linkMusica,
                                    cifra: cifraMusica
                                })
                            })
                                .then((res) => res.json())
                                .then(() => { setOpen(false) })
                                // .then((data) => setCreatedMusic(data))
                                .catch((error) => {
                                    console.error("Erro na comunicação com a api: ", error);
                                })
                            toast({ title: "Música inserida com sucesso!" })
                        }}>Salvar</Button>
                    <Button className="hover:bg-rose-600/80" onClick={() => setOpen(false)}>Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}