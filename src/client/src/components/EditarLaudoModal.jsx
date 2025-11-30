import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ClipboardList, Car, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import '../styles/manutencao.css';

const EditarLaudoModal = ({
  isOpen,
  veiculo,
  onClose,
  onSave,
  isSubmitting = false,
}) => {
  // Estado LOCAL para o laudo - não causa re-render no componente pai
  const [laudoText, setLaudoText] = useState('');
  const [error, setError] = useState(null);

  // Sincroniza o estado local quando o modal abre ou o veículo muda
  useEffect(() => {
    if (isOpen && veiculo) {
      setLaudoText(veiculo.laudoTecnico || '');
      setError(null);
    }
  }, [isOpen, veiculo?.id]);

  // Reset quando fecha
  useEffect(() => {
    if (!isOpen) {
      setLaudoText('');
      setError(null);
    }
  }, [isOpen]);

  const handleTextChange = useCallback((e) => {
    setLaudoText(e.target.value);
    if (error && e.target.value.trim()) {
      setError(null);
    }
  }, [error]);

  const handleSave = useCallback(async () => {
    if (!laudoText.trim()) {
      setError('Por favor, preencha o laudo técnico antes de salvar.');
      return;
    }

    try {
      await onSave(laudoText.trim());
    } catch (err) {
      setError('Erro ao salvar. Tente novamente.');
    }
  }, [laudoText, onSave]);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  }, [onClose, isSubmitting]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && !isSubmitting) {
      onClose();
    }
  }, [onClose, isSubmitting]);

  if (!veiculo) return null;

  const isValid = laudoText.trim().length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="laudo-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleOverlayClick}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-labelledby="laudo-modal-title"
        >
          <motion.div
            className="laudo-modal-container"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="laudo-modal-header">
              <h3 id="laudo-modal-title" className="laudo-modal-title">
                <span className="laudo-modal-title-icon">
                  <ClipboardList size={20} />
                </span>
                Editar Laudo Técnico
              </h3>
              <button
                className="laudo-modal-close"
                onClick={onClose}
                disabled={isSubmitting}
                aria-label="Fechar modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="laudo-modal-body">
              {/* Info do Veículo */}
              <div className="laudo-veiculo-info">
                <div className="laudo-veiculo-icon">
                  <Car size={24} />
                </div>
                <div className="laudo-veiculo-details">
                  <h4>{veiculo.marca} {veiculo.modelo}</h4>
                  <span className="laudo-veiculo-placa">
                    Placa: {veiculo.placa}
                  </span>
                </div>
              </div>

              {/* Campo de Laudo */}
              <div className="laudo-form-group">
                <label className="laudo-form-label">
                  <ClipboardList size={16} />
                  Laudo Técnico *
                </label>
                
                <textarea
                  className={`laudo-textarea ${error ? 'error' : ''}`}
                  value={laudoText}
                  onChange={handleTextChange}
                  placeholder="Descreva detalhadamente os serviços de manutenção realizados, peças substituídas, verificações feitas e observações técnicas importantes para o processo de venda..."
                  disabled={isSubmitting}
                  rows={8}
                  autoFocus
                />

                {error ? (
                  <div className="laudo-form-error">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                ) : (
                  <div className="laudo-form-hint">
                    <Info size={14} />
                    Este laudo ficará disponível durante o processo de venda e será visível para os compradores.
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="laudo-modal-footer">
              <button
                className="laudo-btn-save"
                onClick={handleSave}
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? (
                  <>
                    <span className="laudo-spinner" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    Salvar e Disponibilizar
                  </>
                )}
              </button>
              
              <button
                className="laudo-btn-cancel"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditarLaudoModal;
