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
        public string Concluido { get; set; }

        [NotMapped]
        public bool StatusConcluido
        {
            get
            {
                if (this.DataConclusao == null)
                    return false;
                else
                    return true;
            }
        }

        [NotMapped]
        public string Status
        {
            get
            {
                if (DataConclusao != null)
                    return "Concluída";
                else if (DataExclusao != null)
                    return "Deletada";
                else
                    return "Aberta";
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
