using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Task.Models
{
    public partial class Tarefas
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public DateTime? DataCriacao { get; set; }
        public DateTime? DataEdicao { get; set; }
        public DateTime? DataConclusao { get; set; }
        public DateTime? DataExclusao { get; set; }

        [NotMapped]
        public Status Status
        {
            get
            {
                if (DataConclusao != null)
                    return Status.Completa;
                else if (DataExclusao != null)
                    return Status.Deletada;
                else
                    return Status.Aberta;
            }
        }
    }

    public enum Status
    {
        Aberta = 0,
        Completa = 1,
        Deletada = 2
    }
}
