import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { premiumServices, paymentMethods } from '../data/mockupData';

const CheckoutPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const currentUser = useStore(state => state.currentUser);
  const createPayment = useStore(state => state.createPayment);
  const updatePaymentStatus = useStore(state => state.updatePaymentStatus);
  
  const [selectedPayment, setSelectedPayment] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    address: currentUser?.address || '',
    city: currentUser?.city || '',
    postalCode: currentUser?.postalCode || '',
    country: currentUser?.country || 'Portugal'
  });
  const [includeShipping, setIncludeShipping] = useState(false);
  const [processing, setProcessing] = useState(false);

  const service = premiumServices.find(s => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Serviço não encontrado</h2>
          <Link to="/premium" className="btn-primary mt-4 inline-block">
            Ver Serviços Premium
          </Link>
        </div>
      </div>
    );
  }

  const shippingCost = 4.99;
  const subtotal = service.price;
  const total = includeShipping ? subtotal + shippingCost : subtotal;

  const handlePayment = async () => {
    if (!selectedPayment) {
      alert('Por favor, selecione um método de pagamento');
      return;
    }

    if (!currentUser) {
      navigate('/login');
      return;
    }

    setProcessing(true);

    // Create payment
    const payment = createPayment({
      serviceId: service.id,
      serviceName: service.title,
      amount: total,
      method: selectedPayment,
      shipping: includeShipping ? shippingAddress : null
    });

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update payment status
    updatePaymentStatus(payment.id, 'completed');

    setProcessing(false);
    alert('Pagamento processado com sucesso!');
    navigate('/certificados');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/premium" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
            ← Voltar aos Serviços Premium
          </Link>
          <h1 className="font-display text-3xl font-bold text-gray-800 mt-4">
            Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Details */}
            <div className="card">
              <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Resumo do Pedido</h2>
              
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                  service.id.includes('cert') ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                  service.id.includes('translation') ? 'bg-gradient-to-br from-blue-400 to-indigo-500' :
                  'bg-gradient-to-br from-purple-400 to-pink-500'
                }`}>
                  <span className="text-3xl">
                    {service.id.includes('cert') ? '🎓' : 
                     service.id.includes('translation') ? '🌐' : '✨'}
                  </span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800">{service.title}</h3>
                  <p className="text-sm text-gray-500">{service.description}</p>
                  {service.period && (
                    <span className="text-xs text-gray-400">/{service.period}</span>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold gradient-text">{service.price}€</div>
                </div>
              </div>
            </div>

            {/* Shipping Option */}
            {service.id.includes('cert') && (
              <div className="card">
                <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Opção de Envio</h2>
                
                <label className="flex items-start p-4 border-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={includeShipping}
                    onChange={(e) => setIncludeShipping(e.target.checked)}
                    className="mt-1 mr-3 w-5 h-5 text-primary-600 rounded"
                  />
                  <div>
                    <div className="font-medium">Receber diploma por correio</div>
                    <p className="text-sm text-gray-500">
                      Envio registado para a sua morada em 5-7 dias úteis
                    </p>
                    <p className="text-sm font-medium text-primary-600 mt-1">+{shippingCost}€</p>
                  </div>
                </label>

                {includeShipping && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Morada</label>
                      <input
                        type="text"
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                        className="input-field"
                        placeholder="Rua, número, andar"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
                        <input
                          type="text"
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                          className="input-field"
                          placeholder="Cidade"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Código Postal</label>
                        <input
                          type="text"
                          value={shippingAddress.postalCode}
                          onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                          className="input-field"
                          placeholder="1000-001"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Payment Methods */}
            <div className="card">
              <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Método de Pagamento</h2>
              
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                      selectedPayment === method.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={selectedPayment === method.id}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-2xl mr-3">{method.icon}</span>
                    <div className="flex-grow">
                      <div className="font-medium">{method.name}</div>
                      <div className="text-sm text-gray-500">{method.description}</div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Card Form Placeholder */}
              {(selectedPayment === 'debit' || selectedPayment === 'credit') && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Número do Cartão</label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Data de Validade</label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="MM/AA"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="123"
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Total */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Total</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">{service.title}</span>
                  <span className="font-medium">{subtotal}€</span>
                </div>
                {includeShipping && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envio</span>
                    <span className="font-medium">{shippingCost}€</span>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="gradient-text">{total}€</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={!selectedPayment || processing}
                className={`w-full mt-6 py-4 rounded-xl font-bold text-white ${
                  processing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600'
                }`}
              >
                {processing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    A processar...
                  </span>
                ) : (
                  `Pagar ${total}€`
                )}
              </button>

              <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Pagamento seguro com SSL
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
